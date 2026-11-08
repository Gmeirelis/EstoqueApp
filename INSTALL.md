# Instalação do EstoqueApp

## Requisitos
- Docker 20.10+ e Docker Compose v2 (`docker compose version`)
- Portas livres: 80 (aplicação), 1050 (API) e 3307 (MySQL)
- Mínimo recomendado: 2 GB de RAM

## 1. Baixar o projeto
```bash
git clone https://github.com/Gmeirelis/EstoqueApp.git 
cd estoqueapp
```

## 2. Configurar o ambiente
```bash
cp .env.example .env
nano .env
```

Preencha todos os valores `CHANGE_ME`:

| Variável | Descrição |
|---|---|
| `DB_ROOT_PASSWORD` | Senha do root do MySQL |
| `DB_USER` / `DB_PASSWORD` | Usuário e senha da aplicação no banco |
| `DB_NAME` | Nome do banco (padrão: `estoque_app`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Login do administrador inicial |
| `JWT_SECRET` | Segredo para assinar os tokens de login |

Para gerar um `JWT_SECRET` seguro:
```bash
openssl rand -hex 32
```

> ⚠️ Nunca envie o arquivo `.env` ao Git.

## 3. Subir os serviços
```bash
docker compose up -d --build
```

Na primeira execução, o banco é criado e populado com `database/estoqueApp.sql`,
e o usuário administrador é criado automaticamente. Pode levar 1 a 2 minutos.

## 4. Verificar
```bash
docker compose ps
docker compose logs -f backend
```

Todos os containers devem estar `running` (o `estoque_db` como `healthy`).

## 5. Acessar
- Aplicação: `http://IP_DO_SERVIDOR`
- Login: o `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos no `.env`

Troque a senha do administrador após o primeiro acesso.

## Comandos úteis
| Ação | Comando |
|---|---|
| Parar | `docker compose down` |
| Reiniciar | `docker compose restart` |
| Ver logs | `docker compose logs -f <servico>` |
| Atualizar versão | `git pull && docker compose up -d --build` |
| Backup do banco | `docker exec estoque_db mysqldump -u root -p<SENHA_ROOT> estoque_app > backup.sql` |

## Problemas comuns
- **Porta em uso:** altere a porta à esquerda em `ports:` no `docker-compose.yml`.
- **Backend não conecta ao banco:** aguarde o `estoque_db` ficar `healthy` e veja `docker compose logs db`.
- **Mudei a senha do banco no `.env` e não funcionou:** o MySQL só lê essas variáveis na primeira criação do volume. Para recriar do zero (**apaga todos os dados**): `docker compose down -v && docker compose up -d`.
- **Script SQL não rodou:** ele só executa quando o volume `db_data` está vazio (mesma solução acima).
