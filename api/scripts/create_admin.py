# from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import engine
from lovelace.models import Role, User
from lovelace.security import get_password_hash

admin = User(
    username='SUPERADMIN',
    email='super@admin.com',
    password=get_password_hash('Admin123'),
    role=Role.admin,
)

with Session(engine) as session:
    session.add(admin)
    session.commit()
