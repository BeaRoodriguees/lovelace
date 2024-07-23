from datetime import datetime
from enum import Enum

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, registry

table_registry = registry()


class Status(str, Enum):
    in_queue = 'in_queue'
    running = 'running'
    accepted = 'accepted'
    wrong_answer = 'wrong_answer'
    time_limit_exceeded = 'time_limit_exceeded'
    runtime_error = 'runtime_error'


class Language(str, Enum):
    c = 'c'
    cpp = 'cpp'
    python = 'python'


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

@table_registry.mapped_as_dataclass
class Submission:
    __tablename__ = 'submissions'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    body: Mapped[str] = mapped_column(nullable=False)
    language: Mapped[Language] = mapped_column()
    status: Mapped[Status] = mapped_column(
        default=Status.in_queue
    )
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class Problem:
    __tablename__ = 'problems'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str] = mapped_column()
    entry: Mapped[str] = mapped_column(nullable=False)
    output: Mapped[str] = mapped_column(nullable=False)
