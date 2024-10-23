import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from testcontainers.postgres import PostgresContainer

from lovelace.app import app
from lovelace.database import get_session
from lovelace.models import Role, User, table_registry
from lovelace.security import get_password_hash


@pytest.fixture(scope='session')
def engine():
    with PostgresContainer('postgres:14-alpine', driver='psycopg') as postgres:
        _engine = create_engine(postgres.get_connection_url())

        with _engine.begin():
            yield _engine


@pytest.fixture
def session(engine):
    table_registry.metadata.create_all(engine)

    with Session(engine) as session:
        yield session
        session.rollback()

    table_registry.metadata.drop_all(engine)


@pytest.fixture
def client(session):
    def get_session_override():
        return session

    with TestClient(app) as client:
        app.dependency_overrides[get_session] = get_session_override
        yield client

    app.dependency_overrides.clear()


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


@pytest.fixture
def admin(session):
    admin = User(
        username='SUPERADMIN',
        email='super@admin.com',
        password=get_password_hash('Admin123'),
        role=Role.admin,
    )

    session.add(admin)
    session.commit()
    session.refresh(admin)

    admin.clean_password = 'Admin123'
    return admin


@pytest.fixture
def admin_token(client, admin, session):
    response = client.post(
        '/auth/token',
        data={'username': admin.email, 'password': admin.clean_password},
    )

    return response.json()['access_token']
