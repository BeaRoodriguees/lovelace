from pydantic import BaseModel, ConfigDict, EmailStr


class CreateUserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str


class EditUserSchema(BaseModel):
    username: str
    password: str


class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: list[UserSchema]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
