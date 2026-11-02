const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function createAdmin() {
  let db;

  

  try {
    const {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    } = process.env;
    
  console.log(ADMIN_EMAIL,ADMIN_PASSWORD)


    // Validação das variáveis do banco.
    if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
      throw new Error('Configure corretamente as variáveis de conexão com o banco.');
    }

    // Validação das credenciais do administrador.
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('Configure ADMIN_EMAIL e ADMIN_PASSWORD.');
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error('A senha inicial deve ter pelo menos 12 caracteres.');
    }

    // Conexão com o banco.
    db = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT) || 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    await db.beginTransaction();

    // Verifica se o administrador já existe.
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

    // Gera o hash da senha.
    const senhaHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Cria o administrador.
    await db.execute(
      `INSERT INTO usuarios
       (id_departamento, nome, sobrenome, email, senha, administrador)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        8,
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