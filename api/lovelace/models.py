from datetime import datetime
from enum import Enum

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship
from sqlalchemy.schema import PrimaryKeyConstraint

table_registry = registry()


class Role(str, Enum):
    admin = 'admin'
    user = 'user'


class Difficulty(str, Enum):
    very_hard = 'very_hard'
    hard = 'hard'
    medium = 'medium'
    easy = 'easy'
    very_easy = 'very_easy'


class ProblemStatus(str, Enum):
    todo = 'todo'
    correct = 'correct'
    wrong = 'wrong'


class SubmissonStatus(str, Enum):
    wrong_answer = 'WRONG ANSWER'
    accepted = 'ACCEPTED'
    compilation_error = 'COMPILATION_ERROR'
    runtime_error = 'RUNTIME_ERROR'
    time_limit_exceeded = 'TIME_LIMIT_EXCEEDED'
    presentation_error = 'PRESENTATION_ERROR'
    pending = 'PENDING'
    testing = 'TESTING'
    memory_limit_exceeded = 'MEMORY_LIMIT_EXCEEDED'
    server_error = 'SERVER_ERROR'


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    role: Mapped[Role] = mapped_column(
        default=Role.user, server_default='user'
    )
    is_active: Mapped[bool] = mapped_column(
        default=True, server_default='true'
    )
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
    sumbissions: Mapped[list['Submission']] = relationship(
        init=False, back_populates='user', cascade='all, delete-orphan'
    )


@table_registry.mapped_as_dataclass
class Problem:
    __tablename__ = 'problems'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str]
    problem_input: Mapped[str]
    problem_output: Mapped[str]
    sumbissions: Mapped[list['Submission']] = relationship(
        init=False, back_populates='user', cascade='all, delete-orphan'
    )
    difficulty: Mapped[Difficulty]
    status: Mapped[ProblemStatus] = mapped_column(
        default=ProblemStatus.todo, server_default='todo'
    )


@table_registry.mapped_as_dataclass
class Submission:
    __tablename__ = 'submissions'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    user: Mapped[User] = relationship(init=False, back_populates='submissions')
    problem_id: Mapped[int] = mapped_column(ForeignKey('problems.id'))
    problem: Mapped[Problem] = relationship(
        init=False, back_populates='submissions'
    )
    body: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    language: Mapped[str]
    status: Mapped[SubmissonStatus]


@table_registry.mapped_as_dataclass
class Tag:
    __tablename__ = 'tags'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)


@table_registry.mapped_as_dataclass
class ProblemsTags:
    __tablenanme__ = 'problems_tags'

    problem_id: Mapped[int] = mapped_column(primary_key=True)
    tag_id: Mapped[int] = mapped_column(primary_key=True)
    problem: Mapped[Problem] = relationship(init=False)
    tag: Mapped[Tag] = relationship(init=False)

    __table_args__ = (PrimaryKeyConstraint('problem_id', 'tag_id'),)
