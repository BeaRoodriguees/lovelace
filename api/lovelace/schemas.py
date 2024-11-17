from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from lovelace.models import Difficulty, ProblemStatus, Role, SubmissionStatus


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
    id: int
    input: str
    output: str
    is_sample: bool
    model_config = ConfigDict(from_attributes=True)


class TagSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class CreateSubmissionSchema(BaseModel):
    body: str
    language: str
    problem_id: int


class SubmissionSchema(BaseModel):
    id: int
    body: str
    created_at: datetime
    language: str
    status: SubmissionStatus
    model_config = ConfigDict(from_attributes=True)


class ProblemSchema(BaseModel):
    id: int
    name: str
    description: str
    problem_input: str
    problem_output: str
    difficulty: Difficulty
    time_limit: int
    memory_limit: int
    testcases: list[TestcaseSchema]
    tags: list[TagSchema]
    created_at: datetime
    author: UserSchema
    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def model_valite_with_filter(cls, orm_obj):
        instance = cls.model_validate(orm_obj)
        instance.testcases = [tc for tc in instance.testcases if tc.is_sample]
        return instance


class ProblemData(BaseModel):
    problem: ProblemSchema
    submissions: list[SubmissionSchema]
    user_status: ProblemStatus
    model_config = ConfigDict(from_attributes=True)


class ProblemAndStatus(BaseModel):
    problem: ProblemSchema
    user_status: ProblemStatus
