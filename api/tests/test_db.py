from sqlalchemy import select

from lovelace.models import User


def test_create_user(session):
    user = User(
        username='ACANE',
        password='zutomayo_subarashi',
        email='acane@zutomayo.com',
    )

    session.add(user)
    session.commit()

    db_user = session.scalar(select(User).where(User.email == user.email))

    assert db_user.username == 'ACANE'
