const mysql = require('mysql2');
const path = require('path');


const envPath = path.resolve(__dirname, '../../../.env');

require('dotenv').config({
  path: envPath
});



const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    return;
  }

  console.log('Conectado ao banco de dados MySQL com sucesso!');
});

module.exports = conexao;