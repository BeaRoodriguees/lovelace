from pydantic import BaseModel, ConfigDict, EmailStr

from lovelace.models import Difficulty, Role


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
    role: Role
    is_active: bool
    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: list[UserSchema]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class TestcaseSchema(BaseModel):
    input: str
    output: str
    is_sample: bool


class ProblemSchema(BaseModel):
    name: str
    description: str
    input: str
    output: str
    difficulty: Difficulty
    time_limit: int
    memory_limit: int
    testcases: list[TestcaseSchema]
    tags: list[str]


class ProblemList(BaseModel):
    problems: list[ProblemSchema]
