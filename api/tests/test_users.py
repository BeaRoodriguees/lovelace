from http import HTTPStatus

from lovelace.schemas import UserSchema


def test_create_user(client):
    response = client.post(
        '/users',
        json={
            'username': 'ada',
            'email': 'ada@computers.com',
            'password': 'amalaço',
        },
    )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'username': 'ada',
        'email': 'ada@computers.com',
        'role': 'user',
        'is_active': True,
    }


def test_create_user_missing_field(client):
    response = client.post(
        '/users',
        json={
            'username': 'ada',
            'password': 'amalaço',
        },
    )

    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY


def test_create_user_duplicate_email(client, user):
    response = client.post(
        '/users',
        json={
            'username': 'ada',
            'email': user.email,
            'password': 'amalaço',
        },
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Email already exists.'}


def test_create_user_username_email(client, user):
    response = client.post(
        '/users',
        json={
            'username': user.username,
            'email': 'ada@computers.com',
            'password': 'amalaço',
        },
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Username already exists.'}


def test_get_users(client, user):
    user_schema = UserSchema.model_validate(user).model_dump()
    response = client.get('/users')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'users': [user_schema]}


def test_get_0_users(client):
    response = client.get('/users')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'users': []}


def test_get_user(client, user):
    user_schema = UserSchema.model_validate(user).model_dump()

    response = client.get(f'/users/{user.id}')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == user_schema


def test_edit_user(client, token, user):
    new_data = {'username': 'zefinha_do_barulho', 'password': 'zefas2222'}

    response = client.put(
        f'/users/{user.id}',
        headers={'Authorization': f'Bearer {token}'},
        json=new_data,
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'id': user.id,
        'email': user.email,
        'username': new_data['username'],
        'role': user.role,
        'is_active': user.is_active,
    }


def test_edit_user_another_user(client, token, user, another_user):
    new_data = {'username': 'zefinha_do_barulho', 'password': 'zefas2222'}

    response = client.put(
        f'/users/{another_user.id}',
        headers={'Authorization': f'Bearer {token}'},
        json=new_data,
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST


def test_delete_user(client, token, user):
    response = client.delete(
        f'/users/{user.id}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'message': 'User deleted!'}


def test_delete_user_another_user(client, token, user, another_user):
    response = client.delete(
        f'/users/{another_user.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST
