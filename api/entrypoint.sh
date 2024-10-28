#!/bin/sh

# Adiciona o projeto ao ambiente virtual (possibilita o uso de scripts)
# As dependências não são instaladas novamente!
poetry install -q

# Executa as migrações do banco de dados
poetry run alembic upgrade head

# Popular banco de dados com dados mockados
python scripts/populate.py

# Inicia a aplicação
poetry run uvicorn --host 0.0.0.0 --port 8000 lovelace.app:app --reload