from http import HTTPStatus


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
    }
