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



---

### 🚀 Funcionalidades

### 📦 Gerenciamento de estoque
- Cadastro de produtos.
- Edição e remoção de produtos.
- Organização dos itens por categorias.
- Controle de disponibilidade e situação dos produtos.
- Histórico de movimentações de estoque.

### 👥 Gerenciamento de funcionários e departamentos
- Cadastro e gerenciamento de funcionários.
- Associação de funcionários aos respectivos departamentos.
- Organização dos equipamentos por departamento.
- Consulta dos responsáveis pelos empréstimos.

### 🔄 Controle de empréstimos
- Empréstimo de produtos para funcionários.
- Registro de data de retirada e previsão de devolução.
- Controle do status dos empréstimos.
- Registro de devolução dos produtos.
- Avisos de empréstimos com prazo de devolução próximo ou atrasado.

### 📊 Dashboard
- Visão geral do estoque.
- Indicadores de produtos por categoria.
- Acompanhamento das movimentações.
- Histórico de entradas e saídas.
- Monitoramento dos empréstimos e devoluções.

---

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
