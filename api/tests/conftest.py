import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from lovelace.app import app
from lovelace.database import get_session
from lovelace.models import User, table_registry
from lovelace.security import get_password_hash


@pytest.fixture
def client(session):
    def get_session_override():
        return session

    with TestClient(app) as client:
        app.dependency_overrides[get_session] = get_session_override
        yield client

    app.dependency_overrides.clear()


@pytest.fixture
def session():
    engine = create_engine(
        'sqlite:///:memory:',
        connect_args={'check_same_thread': False},
        poolclass=StaticPool,
    )

    table_registry.metadata.create_all(engine)

    with Session(engine) as session:
        yield session

    table_registry.metadata.drop_all(engine)


@pytest.fixture
def user(session):
    user = User(
        username='Abc',
        email='abc@test.com',
        password=get_password_hash('Abc123'),
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    user.clean_password = 'Abc123'
    return user


@pytest.fixture
def token(client, user, session):
    response = client.post(
        '/auth/token',
        data={'username': user.email, 'password': user.clean_password},
    )

    return response.json()['access_token']


@pytest.fixture
def another_user(session):
    user = User(
        username='def',
        email='def@test.com',
        password=get_password_hash('Def123'),
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    user.clean_password = 'Def123'
    return user
