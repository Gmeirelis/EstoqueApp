const conexao = require("../config/db");
const { param } = require("../router/userRouter");

require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/*CREATE*/


const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Informe o e-mail e a senha."
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não configurado.");
    return res.status(500).json({
      mensagem: "Erro interno do servidor."
    });
  }

  const sql = `
    SELECT
      id_usuario,
      id_departamento,
      nome,
      sobrenome,
      email,
      senha,
      administrador
    FROM usuarios
    WHERE email = ?
    LIMIT 1
  `;

  conexao.query(sql, [email], async (err, resultados) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err.message);
      return res.status(500).json({
        mensagem: "Erro interno do servidor."
      });
    }

    if (resultados.length === 0) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    const usuario = resultados[0];

    try {
      const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaCorreta) {
        return res.status(401).json({
          mensagem: "E-mail ou senha inválidos."
        });
      }

      const dadosUsuario = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        adm: Boolean(usuario.administrador),
        id_departamento: usuario.id_departamento
      };

      const token = jwt.sign(
        dadosUsuario,
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        usuario: dadosUsuario,
        token
      });
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error.message);
      return res.status(500).json({
        mensagem: "Erro interno do servidor."
      });
    }
  });
};

/*criar usuario */ 

const createUser = async (req, res) => {
  const { id_departamento,nome, sobrenome, email, senha, adm,  } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const sql = `
        INSERT INTO usuarios 
        (id_departamento,nome, sobrenome, email, senha, administrador)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  conexao.query(
    sql,
    [id_departamento,nome, sobrenome, email, senhaCriptografada, adm],
    (err) => {
      if (err) {
        console.error("Erro ao cadastrar usuário", err);
        return res.status(500).json({
          mensagem: "Erro no servidor",
        });
      }

      return res
        .status(201)
        .json({ mensagem: "Usuário cadastrado com sucesso" });
    },
  );
};

/*READ*/
const getUser = (req, res) => {
  const sql = `
    SELECT 
     *
    FROM usuarios
  `;

  conexao.query(sql, (err, resultados) => {
    if (err) {
      console.error("Erro ao consultar usuário", err);
      return res.status(500).json({
        mensagem: "Erro no servidor",
      });
    }

    return res.status(200).json(resultados);
  });
};

/*UPDATE*/
const updateUser = (req, res) => {
  const { id } = req.params;
  const { id_departamento,nome, sobrenome, email, senha, adm } = req.body;

  const sql = `
    UPDATE usuarios
    SET 
     id_departamento = ?,
      nome = ?,
      sobrenome = ?,
      email = ?,
      senha = ?,
      administrador = ?
    WHERE id_usuario = ?
  `;

  conexao.query(
    sql,
    [id_departamento,nome, sobrenome, email, senha, adm,id],
    (err, resultado) => {
      if (err) {
        console.error("erro ao atualizar o usuario", err);
        return res.status(500).json({
          mensagem: "Erro no servidor"});
      }

      return res.status(200).json({
        mensagem: "Usuário atualizado com sucesso",
      });
    },
  );
};

/*DELETE*/

const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = `
DELETE FROM usuarios 
WHERE id_usuario = ?;
`;

  conexao.query(sql, [id], (err) => {
    if (err) {
      console.error("erro ao deletar o usuario:", err);
      return res.status(500).json({ mensagem: "erro no servidor" });
    }

  
    res.status(200).json({ mensagem: "usuario deletado com sucesso" });
  });
};




const getUsuarioLogado = (req, res) => {
  return res.status(200).json({
    id: req.usuario.id,
    nome: req.usuario.nome,
    sobrenome: req.usuario.sobrenome,
    email: req.usuario.email,
    adm: req.usuario.adm,
    id_departamento: req.usuario.id_departamento,
  });
};




module.exports = {
  createUser,
  getUser,
  updateUser,
  loginUser,
  deleteUser,
  getUsuarioLogado
};
