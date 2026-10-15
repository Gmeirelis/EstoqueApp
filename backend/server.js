
const express = require('express');
const cors = require('cors');
const conexao = require('./src/config/db'); // Ajuste para o caminho real

const app = express();
const PORT = process.env.PORT || 1050;

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(require('./src/router/userRouter'));
app.use(require('./src/router/departmentRouter'));
app.use(require('./src/router/itemRouter'));
app.use(require('./src/router/categoryRouter'));
app.use(require('./src/router/movementRouter'));
app.use(require('./src/router/emprestimoRouter'));
app.use(require('./src/router/funcionarioRouter'));

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Servidor rodando com sucesso',
    porta: PORT,
    status: 'online',
    versao: '1.0.0'
  });
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com MySQL:', err.message);
    process.exit(1);
  }

  console.log('Banco de dados conectado');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EstoqueApp API rodando na porta ${PORT}`);
  });
});
