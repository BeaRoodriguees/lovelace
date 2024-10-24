FROM python:3.12-slim
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app
COPY /api .

RUN ["chmod", "+x", "./entrypoint.sh"]
RUN pip install poetry

RUN poetry config installer.max-workers 10
RUN poetry install --no-interaction --no-ansi

EXPOSE 8000
CMD ["sh", "./entrypoint.sh"]