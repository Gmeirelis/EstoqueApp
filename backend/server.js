const express = require('express');
const cors = require('cors');
const conexao = require('./src/config/db'); // Ajuste para o caminho real

const app = express();
const PORT = process.env.PORT || 1050;

// 1. Configuração do CORS (deve ser o PRIMEIRO middleware)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Trata requisições preflight (OPTIONS) explicitamente
app.use(cors());

// 2. Parsers de corpo da requisição
app.use(express.json());

// 3. Registro de Rotas
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Servidor rodando com sucesso',
    porta: PORT,
    status: 'online',
    versao: '1.0.0'
  });
});

app.use(require('./src/router/userRouter'));
app.use(require('./src/router/departmentRouter'));
app.use(require('./src/router/itemRouter'));
app.use(require('./src/router/categoryRouter'));
app.use(require('./src/router/movementRouter'));
app.use(require('./src/router/emprestimoRouter'));
app.use(require('./src/router/funcionarioRouter'));

// 4. Conexão com o Banco de Dados e Inicialização do Servidor (apenas 1 app.listen)
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com MySQL:', err.message);
    process.exit(1);
  }

  console.log('Banco de dados conectado');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EstoqueApp API rodando em http://192.168.1.3:${PORT}`);
  });
});