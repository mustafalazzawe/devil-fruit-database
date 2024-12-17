from enum import Enum
from typing import Optional
from uuid import UUID
from sqlmodel import Field, SQLModel, JSON, Relationship


class FruitTypeEnum(str, Enum):
    ZOAN = "Zoan"
    LOGIA = "Logia"
    PARAMECIA = "Paramecia"
    MYTHICAL_ZOAN = "Mythical Zoan"


class NameBase(SQLModel):
    name: str = Field(index=True)
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")


class RomanizedName(NameBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    devil_fruit: "DevilFruit" = Relationship(back_populates="romanized_names")


class TranslatedName(NameBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    devil_fruit: "DevilFruit" = Relationship(back_populates="translated_names")


class FruitTypeAssociation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: str
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="types")


class UserAwakening(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_awakened: bool = False
    is_spoiler: bool = False

    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="awakening")


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: str
    is_artificial: bool = False
    is_current: bool = False
    is_spoiler: bool = False

    awakening: Optional["UserAwakening"] = Relationship(back_populates="user")

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="users")


class DevilFruitBase(SQLModel):
    ability: str
    awakened_ability: Optional[str] = None
    is_canon: bool = True


class DevilFruit(DevilFruitBase, table=True):
    fruit_id: UUID = Field(default=None, primary_key=True)

    romanized_names: list["RomanizedName"] = Relationship(back_populates="devil_fruit")
    translated_names: list["TranslatedName"] = Relationship(
        back_populates="devil_fruit"
    )
    types: list["FruitTypeAssociation"] = Relationship(back_populates="devil_fruit")
    users: list["User"] = Relationship(back_populates="devil_fruit")


class DevilFruitSimple(DevilFruitBase):
    fruit_id: UUID

    primary_name: str
    localized_name: Optional[str] = None

    ability: Optional[str] = None
    awakened_ability: Optional[str] = None

    current_user: Optional[str] = None

    primary_type: Optional[str] = None

    is_canon: Optional[bool] = None
    is_spoiler: Optional[bool] = None

    @classmethod
    def from_devil_fruit(
        cls,
        df: "DevilFruit",
        include_names: bool = True,
        include_abilites: bool = True,
        include_user: bool = True,
        include_type: bool = True,
        include_metadata: bool = True,
    ) -> "DevilFruitSimple":
        """
        Convert a DevilFruit instance to DevilFruitSimple

        Args:
            df: DevilFruit instance
            include_names: include romanized and translated names
            include_ability: include ability and awakened ability
            include_type: include fruit type
            inlcude_metadata: include is canon and is spoiler
        """
        result = {
            "fruit_id": df.fruit_id,
        }

        if include_names:
            result.update(
                {
                    "primary_name": (
                        df.romanized_names[0].name if df.romanized_names else None
                    ),
                    "localized_name": (
                        df.translated_names[0].name if df.translated_names else None
                    ),
                }
            )

        if include_abilites:
            result.update(
                {
                    "ability": (df.ability),
                    "awakened_ability": (df.awakened_ability),
                }
            )

        if include_user:
            result.update(
                {"current_user": next((u.user for u in df.users if u.is_current), None)}
            )

        if include_type:
            result.update(
                {
                    "primary_type": df.types[0].type if df.types else None,
                }
            )

        if include_metadata:
            result.update({"is_canon": df.is_canon})

        return cls(**result)


# pydantic models
class RomanizedNameRead(SQLModel):
    name: str
    is_spoiler: bool


class TranslatedNameRead(SQLModel):
    name: str
    is_spoiler: bool


class FruitTypeRead(SQLModel):
    type: str
    is_spoiler: bool


class UserAwakeningRead(SQLModel):
    is_awakened: bool = False
    is_spoiler: bool = False


class UserRead(SQLModel):
    user: str
    is_artificial: bool
    is_current: bool
    is_spoiler: bool

    awakening: Optional[UserAwakeningRead] = None


# relationship models
class DevilFruitWithRelationships(DevilFruitBase):
    fruit_id: UUID

    romanized_names: list[RomanizedNameRead] = []
    translated_names: list[TranslatedNameRead] = []
    types: list[FruitTypeRead] = []
    users: list[UserRead] = []