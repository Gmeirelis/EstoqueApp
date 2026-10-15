
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdmin() {
  let db;

  try {
    const {
      DB_HOST,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        'Configure ADMIN_EMAIL e ADMIN_PASSWORD no arquivo .env.'
      );
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error(
        'A senha inicial deve ter pelo menos 12 caracteres.'
      );
    }

    db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    await db.beginTransaction();

    // Localiza ou cria o departamento administrativo.
    const [departamentos] = await db.execute(
      `SELECT id_departamento
       FROM departamentos
       WHERE departamento_nome = ?
       LIMIT 1`,
      ['Administração']
    );

    let idDepartamento;

    if (departamentos.length > 0) {
      idDepartamento = departamentos[0].id_departamento;
    } else {
      const [novoDepartamento] = await db.execute(
        `INSERT INTO departamentos (departamento_nome)
         VALUES (?)`,
        ['Administração']
      );

      idDepartamento = novoDepartamento.insertId;
    }

    // Não cria uma conta duplicada.
    const [usuarios] = await db.execute(
      `SELECT id_usuario, administrador
       FROM usuarios
       WHERE email = ?
       LIMIT 1`,
      [ADMIN_EMAIL]
    );

    if (usuarios.length > 0) {
      if (!usuarios[0].administrador) {
        throw new Error(
          'O e-mail configurado já pertence a uma conta não administrativa.'
        );
      }

      await db.commit();
      console.log('O administrador já existe. Nenhuma alteração realizada.');
      return;
    }

    const senhaHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await db.execute(
      `INSERT INTO usuarios
       (id_departamento, nome, sobrenome, email, senha, administrador)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        idDepartamento,
        'Administrador',
        'Sistema',
        ADMIN_EMAIL,
        senhaHash,
        1
      ]
    );

    await db.commit();

    console.log('Administrador inicial criado com sucesso.');
    console.log(`E-mail: ${ADMIN_EMAIL}`);
    console.log('A senha não será exibida no terminal.');
  } catch (error) {
    if (db) {
      await db.rollback().catch(() => {});
    }

    console.error('Falha na inicialização:', error.message);
    process.exitCode = 1;
  } finally {
    if (db) {
      await db.end();
    }
  }
}

createAdmin();
