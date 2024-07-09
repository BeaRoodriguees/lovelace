from jwt import decode

from lovelace.security import create_access_token
from lovelace.settings import Settings

settings = Settings()


def test_jwt():
    data: dict = {'email': 'arthurpmrs@gmail.com', 'senha': 'abobrinhas26'}

    token = create_access_token(data)

    decoded = decode(
        token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
    )

    assert decoded['email'] == 'arthurpmrs@gmail.com'
    assert decoded['senha'] == 'abobrinhas26'
    assert decoded['exp']
