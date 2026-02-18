from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Path, Query, Security
from fastapi.security import APIKeyHeader
from sqlalchemy import func
from sqlmodel import Session, or_, select

from app.models import (
    DevilFruit,
    DevilFruitCreate,
    DevilFruitSimple,
    DevilFruitRead,
    FieldSelection,
    FruitTypeAssociation,
    RomanizedName,
    TranslatedName,
    User,
    UserAwakening,
)
from app.core.config import settings
from app.core.db import get_session, upload_db_to_gcs

api_key_header = APIKeyHeader(name="X-API-Key")


def verify_api_key(api_key: str = Security(api_key_header)):
    if api_key != settings.API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


router = APIRouter(tags=["Devil Fruits"])


# devil fruit routes
@router.get(
    "/",
    response_model=list[DevilFruitRead],
    response_model_exclude_none=True,
)
def read_devil_fruits(
    *,
    session: Session = Depends(get_session),
    offset: int = Query(default=0, ge=0),
    limit: int | None = Query(default=None, ge=1),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


@router.get(
    "/simple/",
    response_model=list[DevilFruitSimple],
    response_model_exclude_none=True,
)
def read_devil_fruits_simple(
    *,
    session: Session = Depends(get_session),
    include_metadata: bool = Query(
        default=True, description="Include metadata (i.e. fruit_id, is canon)"
    ),
    include_names: bool = Query(
        default=True, description="Include a romanized and translated name"
    ),
    include_abilities: bool = Query(
        default=True, description="Include fruits ablitites"
    ),
    include_type: bool = Query(default=True, description="Include the fruit type"),
    include_user: bool = Query(
        default=True, description="Include current user of fruit"
    ),
    offset: int = Query(default=0, ge=0),
    limit: int | None = Query(default=None, ge=1),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")

    fields = FieldSelection(
        include_metadata=include_metadata,
        include_names=include_names,
        include_types=include_type,
        include_abilities=include_abilities,
        include_users=include_user,
    )

    simple_fruits = [
        DevilFruitSimple.from_devil_fruit(devil_fruit, fields=fields)
        for devil_fruit in devil_fruits
    ]

    return simple_fruits


@router.get(
    "/fruit-id/{fruit_id}",
    response_model=DevilFruitRead,
    tags=["Devil Fruits"],
)
def read_devil_fruit_by_id(*, session: Session = Depends(get_session), fruit_id: UUID):
    devil_fruit = session.get(DevilFruit, fruit_id)
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


@router.get(
    "/name/{name}",
    response_model=DevilFruitRead,
)
def read_devil_fruit_by_name(*, session: Session = Depends(get_session), name: str):
    devil_fruit = session.exec(
        select(DevilFruit)
        .join(RomanizedName)
        .join(TranslatedName)
        .where(or_(RomanizedName.name == name, TranslatedName.name == name))
    ).first()
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


@router.get(
    "/user/{user}",
    response_model=DevilFruitRead,
)
def read_devil_fruit_by_user(*, session: Session = Depends(get_session), user: str):
    devil_fruit = session.exec(
        select(DevilFruit).join(User).where(User.user == user)
    ).first()
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


@router.get(
    "/type/{fruit_type}",
    response_model=list[DevilFruitRead],
)
def read_devil_fruits_by_type(
    *, session: Session = Depends(get_session), fruit_type: str
):
    # TODO: once all known fruit types are added to the enum, will use that instead as the type
    devil_fruits = session.exec(
        select(DevilFruit)
        .join(FruitTypeAssociation)
        .where(FruitTypeAssociation.type == fruit_type)
    ).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="Devil fruits with type not found")

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


@router.get(
    "/search/{search_term}",
    response_model=list[DevilFruitRead],
)
def search_devils_fruits(
    *,
    session: Session = Depends(get_session),
    search_term: str = Path(..., min_length=3),
    limit: int | None = Query(default=None, ge=1),
):
    """
    Search devil fruits by name using fuzzy matching.
    Returns fruits where either romanized or translated names contain the search term.
    Requires at least 3 characters for search.
    """
    devil_fruits = session.exec(
        select(DevilFruit)
        .distinct()
        .join(RomanizedName)
        .join(TranslatedName)
        .join(User)
        .where(
            or_(
                func.lower(RomanizedName.name).contains(search_term.lower()),
                func.lower(TranslatedName.name).contains(search_term.lower()),
                func.lower(User.user).contains(search_term.lower()),
            )
        )
        .limit(limit)
    ).all()

    if not devil_fruits:
        raise HTTPException(
            status_code=404, detail=f"No devil fruits found matching '{search_term}'"
        )

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


@router.post("/create/", response_model=DevilFruitRead, dependencies=[Depends(verify_api_key)])
def create_devil_fruit(
    *, session: Session = Depends(get_session), devil_fruit: DevilFruitCreate
):
    db_devil_fruit = DevilFruit(
        fruit_id=devil_fruit.fruit_id,
        ability=devil_fruit.ability,
        awakened_ability=devil_fruit.awakened_ability,
        is_canon=devil_fruit.is_canon,
    )
    session.add(db_devil_fruit)

    for rname in devil_fruit.names.romanized_names:
        session.add(RomanizedName(name=rname.name, is_spoiler=rname.is_spoiler, fruit_id=db_devil_fruit.fruit_id))

    for tname in devil_fruit.names.translated_names:
        session.add(TranslatedName(name=tname.name, is_spoiler=tname.is_spoiler, fruit_id=db_devil_fruit.fruit_id))

    for type_data in devil_fruit.types:
        session.add(FruitTypeAssociation(type=type_data.type, is_spoiler=type_data.is_spoiler, fruit_id=db_devil_fruit.fruit_id))

    for user_data in devil_fruit.users.current_users:
        user = User(user=user_data.user, is_artificial=user_data.is_artificial, is_current=True, is_spoiler=user_data.is_spoiler, fruit_id=db_devil_fruit.fruit_id)
        session.add(user)
        session.add(UserAwakening(is_awakened=user_data.awakening.is_awakened, is_spoiler=user_data.awakening.is_spoiler, user=user))

    for user_data in devil_fruit.users.previous_users:
        user = User(user=user_data.user, is_artificial=user_data.is_artificial, is_current=False, is_spoiler=user_data.is_spoiler, fruit_id=db_devil_fruit.fruit_id)
        session.add(user)
        session.add(UserAwakening(is_awakened=user_data.awakening.is_awakened, is_spoiler=user_data.awakening.is_spoiler, user=user))

    session.commit()
    session.refresh(db_devil_fruit)

    if settings.ENVIRONMENT.is_prod:
        upload_db_to_gcs()

    return DevilFruitRead.from_orm(db_devil_fruit)


@router.delete("/delete/{fruit_id}", dependencies=[Depends(verify_api_key)])
def delete_devil_fruit(*, session: Session = Depends(get_session), fruit_id: UUID):
    db_devil_fruit = session.get(DevilFruit, fruit_id)
    if not db_devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    # Delete child records manually (SQLite does not enforce FK cascades by default)
    users = session.exec(select(User).where(User.fruit_id == fruit_id)).all()
    for user in users:
        awakenings = session.exec(select(UserAwakening).where(UserAwakening.user_id == user.id)).all()
        for awakening in awakenings:
            session.delete(awakening)
        session.delete(user)

    for record in session.exec(select(RomanizedName).where(RomanizedName.fruit_id == fruit_id)).all():
        session.delete(record)

    for record in session.exec(select(TranslatedName).where(TranslatedName.fruit_id == fruit_id)).all():
        session.delete(record)

    for record in session.exec(select(FruitTypeAssociation).where(FruitTypeAssociation.fruit_id == fruit_id)).all():
        session.delete(record)

    session.delete(db_devil_fruit)
    session.commit()

    if settings.ENVIRONMENT.is_prod:
        upload_db_to_gcs()

    return {"deleted": str(fruit_id)}
