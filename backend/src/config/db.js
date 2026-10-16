const mysql = require('mysql2');
require('dotenv').config();

const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'db', // Se DB_HOST não existir no .env, usa 'db' (nome do serviço Docker)
  user: process.env.DB_USER || 'estoque_user',
  password: process.env.DB_PASSWORD || 'estoque_password',
  database: process.env.DB_NAME || 'estoque_db',
  port: process.env.DB_PORT || 3306
});

// Teste de conexão (Opcional, mas muito útil para ver logs no Docker)
conexao.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
  }
});

module.exports = conexao;