# Instalação do EstoqueApp

## Requisitos

- **Docker** 20.10+ com **Docker Compose v2** (confira com `docker compose version`)
  - **Windows:** instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) e deixe-o aberto (ícone da baleia ativo) antes de começar
  - **Linux:** instale o Docker Engine e o plugin do Compose
- **Git** ([git-scm.com](https://git-scm.com/downloads))
- Portas livres: 80 (aplicação), 1050 (API) e 3307 (MySQL)
- Mínimo recomendado: 2 GB de RAM

## 1. Baixar o projeto

```bash
git clone https://github.com/Gmeirelis/EstoqueApp.git
cd EstoqueApp
```

> Funciona igual no Linux, macOS e Windows (PowerShell).

## 2. Configurar o ambiente

O sistema precisa de algumas configurações para funcionar, como o endereço do banco de dados e as suas credenciais (usuário e senha). Elas ficam em um arquivo chamado `.env`.

O projeto já vem com um arquivo modelo chamado `.env.example`. Você vai criar uma cópia dele com o nome `.env` e preencher com os seus dados.

**Passo 1:** Na pasta do projeto, crie a cópia:

| Sistema | Comando |
|---|---|
| Linux / macOS | `cp .env.example .env` |
| Windows (PowerShell ou CMD) | `copy .env.example .env` |

> O que isso faz: cria uma cópia do `.env.example` com o nome `.env`. O arquivo original continua na pasta, sem alterações.

**Passo 2:** Abra o novo arquivo para editar:

| Sistema | Comando |
|---|---|
| Linux / macOS | `nano .env` |
| Windows | `notepad .env` |

> O que isso faz: abre o arquivo `.env` em um editor de texto.
> No Linux, para salvar e sair: `Ctrl + O`, `Enter`, depois `Ctrl + X`.
> No Windows, salve normalmente com `Ctrl + S` e feche o Bloco de Notas.

**Passo 3:** Preencha todos os valores `CHANGE_ME`:

| Variável | Descrição |
|---|---|
| `DB_ROOT_PASSWORD` | Senha do root do MySQL |
| `DB_USER` / `DB_PASSWORD` | Usuário e senha da aplicação no banco |
| `DB_NAME` | Nome do banco (padrão: `estoque_app`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Login do administrador inicial (senha com **no mínimo 12 caracteres**) |
| `JWT_SECRET` | Segredo para assinar os tokens de login |

Para gerar um `JWT_SECRET` seguro:

**Linux / macOS:**
```bash
openssl rand -hex 32
```

**Windows (PowerShell):**
```powershell
$b = New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); ($b | ForEach-Object { $_.ToString('x2') }) -join ''
```

Copie o resultado e cole no `.env`.

> **Não encontra o `.env`?** Ele começa com ponto e fica oculto em alguns gerenciadores de arquivos.
> Linux: `Ctrl + H`. Windows: no Explorador, aba **Exibir > Mostrar > Itens ocultos** e **Extensões de nomes de arquivos**.

> ⚠️ O `.env` contém suas senhas. Nunca envie para o Git nem compartilhe.

## 3. Subir os serviços

```bash
docker compose up -d --build
```

Na primeira execução, o banco é criado e populado com `database/estoqueApp.sql`, e o usuário administrador é criado automaticamente. Pode levar 1 a 2 minutos.

## 4. Verificar

```bash
docker compose ps
docker compose logs -f backend
```

Todos os containers devem estar `running` (o `estoque_db` como `healthy`). Para sair dos logs, pressione `Ctrl + C`.

## 5. Acessar

- No próprio computador: `http://localhost`
- Em outro dispositivo da rede: `http://IP_DO_SERVIDOR`
- Login: o `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos no `.env`

Para descobrir o IP do computador:

| Sistema | Comando |
|---|---|
| Linux | `hostname -I` |
| Windows | `ipconfig` (procure por "Endereço IPv4") |

Troque a senha do administrador após o primeiro acesso.

## Comandos úteis

| Ação | Comando |
|---|---|
| Parar | `docker compose down` |
| Reiniciar | `docker compose restart` |
| Ver logs | `docker compose logs -f <servico>` |
| Atualizar versão | `git pull` e depois `docker compose up -d --build` |

### Backup do banco

Funciona em Linux, macOS e Windows (substitua `<SENHA_ROOT>`):

```bash
docker exec estoque_db sh -c "mysqldump -u root -p<SENHA_ROOT> estoque_app > /tmp/backup.sql"
docker cp estoque_db:/tmp/backup.sql backup.sql
```

## Problemas comuns

- **Porta em uso:** altere a porta à esquerda em `ports:` no `docker-compose.yml`.
  Para ver quem está usando a porta 80: Linux `sudo lsof -i :80`, Windows `netstat -ano | findstr :80`.
- **Windows: "Docker daemon is not running":** abra o Docker Desktop e espere ele iniciar.
- **Backend não conecta ao banco:** aguarde o `estoque_db` ficar `healthy` e veja `docker compose logs db`.
- **Mudei a senha do banco no `.env` e não funcionou:** o MySQL só lê essas variáveis na primeira criação do volume. Para recriar do zero (**apaga todos os dados**): `docker compose down -v` e depois `docker compose up -d`.
- **Script SQL não rodou:** ele só executa quando o volume `db_data` está vazio (mesma solução acima).