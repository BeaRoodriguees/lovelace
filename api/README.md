# Lovelace Backend API

## Setup de desenvolvimento
1. Instale o [Pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#installation)
2. Baixe uma versão do Python (`pyenv install 3.12.4`)
3. Instale o [Poetry](https://python-poetry.org/docs/#installation) (sugerido usar `pipx`, veja na documentação do Poetry)
4. Na pasta local do repositório, faça uma cópia do arquivo `.env.example` e renomeio-o como `.env`
5. Por fim, execute os seguintes comandos:

```bash
# Para especificar a versão do Python a ser utilizada
pyenv local 3.12.4

# Para instalar as dependências
poetry install

# Para ativar o ambiente virtual criado pelo poetry
poetry shell

# Para criar o banco de dados e suas tabelas
alembic upgrade head
```
**Opcional**: Instalar [extensão do Ruff para VSCode](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff). Configurações para formatação automática ao salvar os arquivos:

```json
// Adicione isso no seu arquivo settings.json
"[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit",
    },
},
```
### Comandos
Para facilitar a execução de tarefas rotineiras, usamos o `taskipy`. Os comandos possíveis estão listados abaixo. Lembre de ativar o ambiente virtual do Poetry (`poetry shell`). Para mais informações, consulte o arquivo `pyproject.toml`.

- `lint`: Informa violações das regras de formatação e boas práticas de código.
- `format`: Corrige violações das regras de formatação e boas práticas de código (quando possível).
- `run`: Executa o servidor backend em modo de desenvolvimento.
- `test`: Executa os testes.

Para executar, faça `task nome_do_commando`, e.g. `task run` para executar os servidor em modo de desenvolvimento.

### Criar migração
Mudanças na estrutura (esquema) do banco de dados requerem a criação e exeução de uma migração. Para isso, usamos o Alembic. Depois de modificar os modelos em `lovelace/models.py`:

1. Crie uma migração com `alembic revision --autogenerate -m "explain what are the changes here"`
2. Execute a migração com `alembic upgrade head`