from fastapi import FastAPI

from lovelace.routers import auth, users

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)


@app.get('/')
def root():
    return {'message': 'Hello World'}
