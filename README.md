# Lovelace
Inspirado por Ada Lovelace, a primeira programadora da história, o Lovelace é um espaço dedicado ao aprendizado e aprimoramento das habilidades de programação.

## Execução da aplicação usando containers
1. Instale o [Docker](https://docs.docker.com/engine/install/). Para Windows sugerimos o [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
2. Crie um arquivo `.env` copiando o arquivo `.env.example` e inserindo valores apropriados para as variáveis de ambiente.
3. Execute o comando `docker compose up --build --watch`, aguarde a inicialização.

>[!NOTE]
> A flag `--build` só é necessária quando há uma mudança no código e desejamos reconstruir a imagen e o container. 
>
>Já a flag `--watch` faz com que, durante a execução do container, as mudanças feitas na pasta original sejam replicadas dentro do container.

>[!WARNING]
> Caso algum problema que não faz sentido esteja acontecendo, use o comando `docker compose up --build --force-recreate` para recriar os containers do zero.
> 
> Para criar imagens sem a camada de cache, use `docker compose build --no-cache <service>`.

### Criação do usuário admin
Para criar o usuário admin siga os seguintes passos:

1. Execute o sistema como mostrado acima
2. Em outro terminal, execute o comando `docker compose exec api python scripts/create_admin.py`

### Acesso ao banco de dados via PgAdmin
Para Fazer queries direto ao banco de dados e visualizar tabelas, use o PgAdmin.

1. Acesso `http://localhost:89`
2. Entre as credenciais
3. Clique com o botão direito em Servers
4. Clique em Register Server
5. Insira um nome (lovelace, por exemplo)
6. Vá para a aba connection
7. Insira "pgsql" no campo "Host name/address"
8. Insira o username e a senha do banco 