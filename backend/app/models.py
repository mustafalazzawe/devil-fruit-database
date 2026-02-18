from dataclasses import dataclass
from enum import Enum, auto
from typing import Optional
from uuid import UUID
from sqlmodel import Field, SQLModel, Relationship


class IncludeFields(Enum):
    METADATA = auto()
    NAMES = auto()
    TYPES = auto()
    ABILITIES = auto()
    USERS = auto()


@dataclass
# dataclass, includes special methods like __init__, __repr__, __eq__, by default
class FieldSelection:
    """Configuration for including fields in a response"""

    include_metadata: bool = True
    include_names: bool = True
    include_types: bool = True
    include_abilities: bool = True
    include_users: bool = True

    def to_set(self) -> set:
        """Convert the FieldSelection instance to a set"""
        fields = set()
        if self.include_metadata:
            fields.add(IncludeFields.METADATA)
        if self.include_names:
            fields.add(IncludeFields.NAMES)
        if self.include_types:
            fields.add(IncludeFields.TYPES)
        if self.include_abilities:
            fields.add(IncludeFields.ABILITIES)
        if self.include_users:
            fields.add(IncludeFields.USERS)
        return fields


class FruitTypeEnum(str, Enum):
    ZOAN = "Zoan"
    ANCIENT_ZOAN = "Ancient Zoan"
    MYTHICAL_ZOAN = "Mythical Zoan"
    LOGIA = "Logia"
    PARAMECIA = "Paramecia"
    SPECIAL_PARAMECIA = "Special Paramecia"
    UNDETERMINED = "Undetermined"


class RomanizedName(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="romanized_names")


class TranslatedName(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="translated_names")


class FruitTypeAssociation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: FruitTypeEnum
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="types")


class UserAwakening(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_awakened: bool = False
    is_spoiler: bool = False

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: "User" = Relationship(back_populates="awakening")


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: str = Field(index=True)
    is_artificial: bool = False
    is_current: bool = False
    is_spoiler: bool = False

    awakening: Optional["UserAwakening"] = Relationship(back_populates="user")

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="users")


class DevilFruit(SQLModel, table=True):
    fruit_id: UUID = Field(default=None, primary_key=True)

    romanized_names: list["RomanizedName"] = Relationship(back_populates="devil_fruit")
    translated_names: list["TranslatedName"] = Relationship(
        back_populates="devil_fruit"
    )
    types: list["FruitTypeAssociation"] = Relationship(back_populates="devil_fruit")

    ability: str
    awakened_ability: Optional[str] = None

    users: list["User"] = Relationship(back_populates="devil_fruit")

    is_canon: bool = True


# pydantic models
class NameRead(SQLModel):
    name: str
    is_spoiler: bool


class NamesRead(SQLModel):
    romanized_names: list[NameRead] = []
    translated_names: list[NameRead] = []


class FruitTypeRead(SQLModel):
    type: FruitTypeEnum
    is_spoiler: bool


class UserAwakeningRead(SQLModel):
    is_awakened: bool = False
    is_spoiler: bool = False


class UserRead(SQLModel):
    user: str
    is_artificial: bool
    is_spoiler: bool

    awakening: Optional[UserAwakeningRead] = None


class UsersRead(SQLModel):
    current_users: Optional[list[UserRead]] = None
    previous_users: Optional[list[UserRead]] = None


class DevilFruitRead(SQLModel):
    fruit_id: UUID

    names: NamesRead
    types: list[FruitTypeRead] = []

    ability: str
    awakened_ability: Optional[str] = None

    users: UsersRead

    is_canon: bool = True

    @classmethod
    def from_orm(cls, df: DevilFruit):
        current_users = [u for u in df.users if u.is_current]
        previous_users = [u for u in df.users if not u.is_current]

        devil_fruit_dict = {
            "fruit_id": df.fruit_id,
            "ability": df.ability,
            "awakened_ability": df.awakened_ability,
            "names": {
                "romanized_names": [n for n in df.romanized_names],
                "translated_names": [n for n in df.translated_names],
            },
            "types": df.types,
            "users": {
                "current_users": current_users or None,
                "previous_users": previous_users or None,
            },
            "is_canon": df.is_canon,
        }

        return cls(**devil_fruit_dict)


class DevilFruitSimple(SQLModel):
    fruit_id: Optional[UUID] = None
    names: Optional[set[str]] = None
    types: Optional[set[str]] = None  # Optional[set[FruitTypeEnum]]
    ability: Optional[str] = None
    awakened_ability: Optional[str] = None
    users: Optional[set[str]] = None
    is_canon: Optional[bool] = None

    @classmethod
    def from_devil_fruit(
        cls,
        devil_fruit: "DevilFruit",
        fields: Optional[FieldSelection] = None,
    ) -> "DevilFruitSimple":
        """
        Convert a DevilFruit instance to DevilFruitSimple

        Args:
            devil_fruit: DevilFruit instance
            fields: FieldSelection instance to determine which fields to include
        """
        fields = fields or FieldSelection()
        included_fields = fields.to_set()

        result = {}

        def get_metadata():
            return {
                "fruit_id": devil_fruit.fruit_id,
                "is_canon": devil_fruit.is_canon,
            }

        def get_names():
            return {
                name.name
                for name in devil_fruit.romanized_names + devil_fruit.translated_names
            }

        def get_types():
            return {ta.type for ta in devil_fruit.types}

        def get_abilities():
            return {
                "ability": devil_fruit.ability,
                "awakened_ability": devil_fruit.awakened_ability,
            }

        def get_users():
            return {user.user for user in devil_fruit.users}

        if IncludeFields.METADATA in included_fields:
            result.update(get_metadata())

        if IncludeFields.NAMES in included_fields:
            result.update({"names": get_names()})

        if IncludeFields.TYPES in included_fields:
            result.update({"types": get_types()})

        if IncludeFields.ABILITIES in included_fields:
            result.update(get_abilities())

        if IncludeFields.USERS in included_fields:
            result.update({"users": get_users()})

        return cls(**result)


# create models
class NameCreate(SQLModel):
    name: str
    is_spoiler: bool = False


class NamesCreate(SQLModel):
    romanized_names: list[NameCreate]
    translated_names: list[NameCreate]


class TypeCreate(SQLModel):
    type: FruitTypeEnum
    is_spoiler: bool = False


class UserAwakeningCreate(SQLModel):
    is_awakened: bool = False
    is_spoiler: bool = False


class UserCreate(SQLModel):
    user: str
    is_artificial: bool = False
    is_spoiler: bool = False
    awakening: UserAwakeningCreate


class UsersCreate(SQLModel):
    current_users: list[UserCreate] = []
    previous_users: list[UserCreate] = []


class DevilFruitCreate(SQLModel):
    ability: str
    awakened_ability: Optional[str] = None
    is_canon: bool = True
    names: NamesCreate
    types: list[TypeCreate]
    users: UsersCreate


class DevilFruitUpdate(SQLModel):
    ability: Optional[str] = None
    awakened_ability: Optional[str] = None
    is_canon: Optional[bool] = None
    names: Optional[NamesCreate] = None
    types: Optional[list[TypeCreate]] = None
    users: Optional[UsersCreate] = None


# relationship models
