from http import HTTPStatus

from freezegun import freeze_time

from lovelace.security import create_access_token


def test_get_token(client, user):
    form_data = {'username': user.email, 'password': user.clean_password}
    response = client.post('/auth/token', data=form_data)

    response_token = response.json()

    assert response.status_code == HTTPStatus.OK
    assert 'access_token' in response_token
    assert 'token_type' in response_token


def test_invalid_token(client):
    response = client.delete(
        '/users/1', headers={'Authorization': 'Bearer token_invalido'}
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {'detail': 'Could not validate credentials.'}


def test_token_username_not_found(client):
    access_token = create_access_token({'sub': 'shirogane@gmail.com'})

    response = client.delete(
        '/users/1', headers={'Authorization': f'Bearer {access_token}'}
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_token_missing_token_username(client):
    access_token = create_access_token({'sub1': 'bla'})

    response = client.delete(
        '/users/1', headers={'Authorization': f'Bearer {access_token}'}
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_expired_token(client, user):
    with freeze_time('2024-06-30 12:00:00'):
        response = client.post(
            '/auth/token',
            data={'username': user.email, 'password': user.clean_password},
        )
        assert response.status_code == HTTPStatus.OK
        token = response.json()['access_token']

    with freeze_time('2024-06-30 12:31:00'):
        response = client.put(
            f'/users/{user.id}',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'username': 'opa',
                'email': 'opaopa@example.com',
                'password': 'eeeeeeita',
            },
        )

        assert response.status_code == HTTPStatus.UNAUTHORIZED
        assert response.json() == {'detail': 'Could not validate credentials.'}


def test_token_inexistent_user(client):
    response = client.post(
        '/auth/token',
        data={
            'username': 'missing_user@missing.com',
            'password': 'any_password',
        },
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Incorrect password or email.'}


def test_token_incorrect_password(client, user):
    response = client.post(
        '/auth/token',
        data={'username': user.email, 'password': 'any_other_password'},
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Incorrect password or email.'}


def test_refresh_token(client, user, token):
    response = client.post(
        '/auth/refresh_token', headers={'Authorization': f'Bearer {token}'}
    )

    data = response.json()

    assert response.status_code == HTTPStatus.OK
    assert 'access_token' in data
    assert 'token_type' in data
    assert data['token_type'] == 'bearer'


def test_refresh_token_with_expired_token(client, user):
    with freeze_time('2024-06-30 12:00:00'):
        response = client.post(
            '/auth/token',
            data={'username': user.email, 'password': user.clean_password},
        )
        assert response.status_code == HTTPStatus.OK
        token = response.json()['access_token']

    with freeze_time('2024-06-30 12:31:00'):
        response = client.post(
            '/auth/refresh_token', headers={'Authorization': f'Bearer {token}'}
        )

        assert response.status_code == HTTPStatus.UNAUTHORIZED
        assert response.json() == {'detail': 'Could not validate credentials.'}
