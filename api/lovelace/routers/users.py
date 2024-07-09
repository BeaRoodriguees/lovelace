from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import User
from lovelace.schemas import (
    CreateUserSchema,
    EditUserSchema,
    UserList,
    UserSchema,
)
from lovelace.security import get_current_user, get_password_hash

Session = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]

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
        username=user.username,
        email=user.email,
        password=get_password_hash(user.password),
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


@router.get('/{user_id}', response_model=UserSchema)
def get_user(user_id: int, session: Session):
    user = session.scalar(select(User).where(User.id == user_id))

    return UserSchema.model_validate(user)


@router.put('/{user_id}', response_model=UserSchema)
def edit_user(
    user_id: int, data: EditUserSchema, session: Session, user: CurrentUser
):
    if user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail='Not enough permission.'
        )

    user.username = data.username
    user.password = get_password_hash(data.password)
    session.commit()
    session.refresh(user)

    return user


@router.delete('/{user_id}')
def delete_user(user_id: int, session: Session, user: CurrentUser):
    if user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail='Not enough permission.'
        )

    session.delete(user)
    session.commit()

    return {'message': 'User deleted!'}
