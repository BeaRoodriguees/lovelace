from datetime import datetime
from enum import Enum

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

table_registry = registry()


class Role(str, Enum):
    admin = 'admin'
    user = 'user'


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
    status: Mapped[str]
    # updated at?
