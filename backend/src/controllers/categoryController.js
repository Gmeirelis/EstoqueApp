const conexão = require("../config/db");
const { param } = require("../router/categoryRouter");

const getCategory = (req, res) => {
  const sql = `SELECT * FROM categorias`;

  conexão.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro ao consultar");
      return res.status(500).json({ mensagem: "erro interno" });
    }

    return res.status(200).json(resultado);
  });
};

const postCategory = (req, res) => {
  const { nome } = req.body;

  const sql = `INSERT INTO categorias (categoria_nome) VALUES (?)`;

  conexão.query(sql, [nome], (err) => {
    if (err) {
      console.error("Erro ao criar a categoria dos itens:", err);
      return res.status(500).json({
        mensagem: "Erro interno no servidor",
      });
    }

    return res.status(201).json({
      mensagem: "Categoria criada com sucesso",
    });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;

  if (id === 4) {
    return res
      .status(400)
      .json({ mensagem: "essa linha não pode ser apagada" });
  }

  const updateItem = `
    UPDATE itens
    SET id_categoria = 4
    WHERE id_categoria = ?
`;

  conexão.query(updateItem, [id], (err) => {
    if (err) {
      console.error("erro ao atualizar o item");
      return res.status(500).json({ mensagem: "internal erro" });
    }

    const deleteitens = "DELETE FROM categorias WHERE id_categorias = ?";

    conexão.query(deleteitens, [id], (err, resultado) => {
      if (err) {
        console.error("erro ao deletar o usuario");
        return res.status(500).json({ mensagem: "internal erro" });
      }
      return res.status(200).json({ mensagem: "item deletado" });
    });
  });
};

const putCategory = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = `UPDATE categorias
    SET 
      nome = ?
    WHERE id_categorias = ?
`;

  conexão.query(sql, [nome, id], (err) => {
    if (err) {
      console.error("erro ao atualizar a categoria");
      return res.status(500).json({ mensagem: "internal erro" });
    }
    return res.status(200).json({ mensagem: "categoria atualizada" });
  });
};



module.exports = {
  getCategory,
  postCategory,
  deleteCategory,
  putCategory
};
