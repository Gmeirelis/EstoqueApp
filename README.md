#  EstoqueApp

## Sumary
 - descrição
 - Tecnologias
 - Funcionalidade
 - imagens
 - como instalar
 - Licença

## Descrição 

Sistema web de gerenciamento e controle de estoque, desenvolvido para facilitar a administração de produtos, funcionários, departamentos e empréstimos de equipamentos.

O EstoqueApp permite acompanhar a movimentação dos itens, controlar entradas e saídas, gerenciar empréstimos e monitorar prazos de devolução por meio de um dashboard.


## Funcionalidades

###  Gerenciamento de Estoque
- Cadastro, edição e remoção de produtos.
- Organização de produtos por categorias.
- Controle de disponibilidade e status dos itens.
- Registro e consulta do histórico de movimentações do estoque.
- Monitoramento da situação dos produtos.

###  Gerenciamento de Funcionários e Departamentos
- Cadastro, edição e gerenciamento de funcionários.
- Associação de funcionários aos seus respectivos departamentos.
- Organização e consulta dos equipamentos por departamento.
- Identificação dos responsáveis pelos empréstimos de produtos.

###  Controle de Empréstimos
- Registro de empréstimos de produtos para funcionários.
- Controle das datas de retirada e previsão de devolução.
- Gerenciamento do status dos empréstimos.
- Registro e acompanhamento da devolução dos produtos.
- Identificação de empréstimos próximos do vencimento ou em atraso.

###  Dashboard
- Visão geral da situação atual do estoque.
- Indicadores de produtos organizados por categoria.
- Acompanhamento das movimentações de estoque.
- Histórico de entradas e saídas de produtos.
- Monitoramento de empréstimos, devoluções e itens pendentes.
- Visualização de indicadores para facilitar o acompanhamento e a gestão do patrimônio.

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando uma arquitetura Full Stack, separando frontend, backend e banco de dados.

| Tecnologia | Aplicação |
|------------|-----------|
| React.js   | Desenvolvimento da interface |
| tailwind css| Estilização |
| Node.js    | Ambiente de execução do backend |
| Express.js | Construção da API REST |
| MySQL      | Banco de dados relacional |
| Docker     | Containerização e implantação |
| Nginx      | Reverse Proxy e direcionamento de requisições |

---

## 🏗️ Arquitetura

A aplicação utiliza uma arquitetura composta por três camadas principais:

**Frontend — React.js**
- Interface de interação com o usuário.
- Consumo da API REST.
- Visualização de informações e indicadores do estoque.

**Backend — Node.js**
- Regras de negócio.
- Validação e processamento das requisições.
- Gerenciamento de funcionários, departamentos, produtos e empréstimos.
- Comunicação com o banco de dados.

**Banco de dados — MySQL**
- Armazenamento de produtos.
- Cadastro de funcionários e departamentos.
- Registro de empréstimos e devoluções.
- Histórico de movimentações.

### Infraestrutura

O projeto utiliza Docker para executar os serviços em containers e Nginx como Reverse Proxy, centralizando o acesso ao frontend e à API.

```text
              USUÁRIO
                 |
                 v
               NGINX
                 |
          +------+------+
          |             |
          v             v
      FRONTEND       BACKEND
       React         Node.js
                        |
                        v
                      MySQL
```

---

## 📁 Estrutura do projeto

```text
EstoqueApp/
│
├── frontend/
├── backend/
├── nginx/
├── docs/
│   └── screenshots/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── INSTALL.md
```

---

## ⚙️ Instalação

Para instalar e executar o EstoqueApp, consulte o manual de instalação:

📖 [Manual de Instalação — INSTALL.md](INSTALL.md)

O manual apresenta os requisitos necessários, configuração das variáveis de ambiente, inicialização dos containers e criação do usuário administrador.

---

## 🔐 Segurança

- Autenticação de usuários.
- Utilização de JWT para autenticação.
- Validação de dados no frontend e backend.
- Gerenciamento de credenciais por variáveis de ambiente.
- Separação dos serviços por containers Docker.

---

## 🎯 Objetivo do projeto

O EstoqueApp foi desenvolvido com o objetivo de oferecer uma solução para controle e gerenciamento de ativos e equipamentos, proporcionando maior organização dos recursos, rastreabilidade das movimentações e controle de responsabilidade sobre os itens emprestados.

Além disso, o projeto busca aplicar conceitos de desenvolvimento Full Stack, APIs REST, banco de dados relacionais, containerização e implantação de aplicações web.

---

## 👨‍💻 Desenvolvedor

**Guilherme Meireles Lima**

Desenvolvedor em formação, com interesse em desenvolvimento de software, Java, React.js, Node.js e infraestrutura de TI.

Desenvolvido com dedicação para fins de aprendizado e aplicação prática de tecnologias Full Stack.
