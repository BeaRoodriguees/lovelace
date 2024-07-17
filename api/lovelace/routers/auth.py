from http import HTTPStatus
from typing import Annotated

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import Role, User
from lovelace.schemas import Token, UserSchema
from lovelace.security import (
    RoleChecker,
    create_access_token,
    get_current_user,
    verify_password,
)

router = APIRouter(prefix='/auth', tags=['auth'])


OAuth2Form = Annotated[OAuth2PasswordRequestForm, Depends()]
Session = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.post('/token', response_model=Token)
def get_token(form_data: OAuth2Form, session: Session):
    user = session.scalar(select(User).where(User.email == form_data.username))

    if not user:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Incorrect password or email.',
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Incorrect password or email.',
        )

    access_token = create_access_token(data={'sub': user.email})

    return Token(access_token=access_token, token_type='bearer')


@router.post('/refresh_token', response_model=Token)
def refresh_access_token(current_user: CurrentUser):
    new_access_token = create_access_token(data={'sub': current_user.email})

    return Token(access_token=new_access_token, token_type='bearer')


@router.get('/me', response_model=UserSchema)
def get_current_user(current_user: CurrentUser):
    return current_user


@router.post('/promote/{user_id}', response_model=UserSchema)
def promote_user_to_admin(
    user_id: int,
    session: Session,
    _: Annotated[bool, Depends(RoleChecker(allowed_roles=[Role.admin]))],
):
    db_user = session.scalar(select(User).where(User.id == user_id))

    if not db_user:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='User not found.'
        )

    db_user.role = Role.admin
    session.commit()
    session.refresh(db_user)

    return db_user
