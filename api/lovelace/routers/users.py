from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import User
from lovelace.schemas import CreateUserSchema, UserList, UserSchema

Session = Annotated[Session, Depends(get_session)]

router = APIRouter(prefix='/users', tags=['users'])


@router.post('/', status_code=HTTPStatus.CREATED, response_model=UserSchema)
def create_user(user: CreateUserSchema, session: Session):
    db_user = session.scalar(
        select(User).where(
            (User.email == user.email) | (User.username == user.username)
        )
    )

    if db_user:
        if db_user.email == user.email:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST,
                detail='Email already exists.',
            )
        elif db_user.username == user.username:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST,
                detail='Username already exists.',
            )

    db_user = User(
        username=user.username, email=user.email, password=user.password
    )

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@router.get('/', response_model=UserList)
def get_users(session: Session, offset: int = 0, limit: int = 25):
    users = session.scalars(select(User).offset(offset).limit(limit)).all()

    response_users = UserList(
        users=[UserSchema.model_validate(user) for user in users]
    )

    return response_users
