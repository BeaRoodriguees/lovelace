FROM python:3.12-slim

RUN pip install poetry
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

COPY /api/entrypoint.sh .
RUN ["chmod", "+x", "./entrypoint.sh"]

COPY /api/pyproject.toml .
COPY /api/poetry.lock .
COPY /api/alembic.ini .
COPY /api/README.md . 

RUN poetry config installer.max-workers 10
RUN poetry install --no-interaction --no-ansi

EXPOSE 8000
CMD ["sh", "./entrypoint.sh"]