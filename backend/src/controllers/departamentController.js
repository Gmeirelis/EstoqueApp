const { json } = require("express");
const conexao = require("../config/db");
const { param } = require("../router/departmentRouter");

/*read*/

/*autenticado */
const getDepartaments = (req, res) => {
  const sql = `SELECT * FROM departamentos
where dep_status = "ATIVO";
 
  `;

  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro ao consultar", err);
      return res.status(500).json({ mensagem: "erro no servidor" });
    }

    if (resultado.length === 0) {
      console.error("departamento não encontrado");
      return res.status(401).json({ mensagem: "departamento não existe" });
    }

    return res.status(200).json(resultado);
  });
};

/*create*/
const postDepartaments = (req, res) => {
  const { nome } = req.body;

  const sql = `INSERT INTO departamentos (departamento_nome) VALUES(?)`;

  conexao.query(sql, [nome], (err) => {
    if (err) {
      console.error("departamento não criado");
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
    return res.status(200).json({ mensagem: "departamento criado" });
  });
};

/*update*/
const putDepartaments = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = `
   update departamentos
set departamento_nome = ?
where id_departamento = ?
`;
  conexao.query(sql, [nome, id], (err) => {
    if (err) {
      console.error("erro ao atulizar o departamento", err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    return res.status(200).json({ mensagem: "departamento Atulizado" });
  });
};

/*delete*/

const deletesDeparatments = (req, res) => {
  const { id } = req.params;

  if (id == 3) {
    return res.status(400).json({
      mensagem: "O departamento Sem Departamento não pode ser excluído",
    });
  }

  const atualizarUsuarios = `
    UPDATE usuarios 
    SET id_departamento = 3
    WHERE id_departamento = ?
`;
  conexao.query(atualizarUsuarios, [id], (err) => {
    if (err) {
      console.error(
        "erro ao mudar o departamento do usuario para o sem departamento",
      );
      return res.status(500).json({ mensagem: "erro interno" });
    }

    const dropDerpataments = `
    DELETE  FROM departamentos
    WHERE id_departamento = ?
`;

    conexao.query(dropDerpataments, [id], (err, resultado) => {
      if (err) {
        console.error("erro ao excluir o departamento");
        return res.status(500).json({ mensagem: "erro interno" });
      }

      if (resultado.affectedRows === 0) {
        return res
          .status(404)
          .json({ mensagem: "departamento não encontrado" });
      }

      return res.status(200).json({ mensagem: "departamento excluido" });
    });
  });
};

// renderizar departamentos
const getDepartamentsPublic = (req, res) => {
  const getSql = `SELECT* FROM departamentos 
  where dep_status = "ATIVO"
  `;

  conexao.query(getSql, (err, resultado) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    return res.status(200).json(resultado);
  });
};

//renderiza cada funcionario do departamento

const getDepUser = (req, res) => {
  const { id } = req.params;

  const sqlget = `
 SELECT * FROM funcionarios f
JOIN departamentos d on f.id_departamento = d.id_departamento
WHERE d.id_departamento = ?  && f.funcionario_status = "ATIVO";
;
  `;

  conexao.query(sqlget, [id], (err, resultado) => {
    if (err) {
      console.log("error ao buscar departamento", err);
      return res.status(500).json({ messagen: err.message });
    }

    return res.status(200).json({ messagen: resultado });
  });
};

const deleteDepartament = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "ID do departamento inválido",
    });
  }

  if (Number(id) === 8) {
    return res.status(400).json({
      message: "O departamento 'Sem Departamento' não pode ser desativado",
    });
  }

  conexao.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    const updateDep = `
      UPDATE departamentos
      SET dep_status = "INATIVO"
      WHERE id_departamento = ?
    `;

    conexao.query(updateDep, [id], (err, result) => {
      if (err) {
        console.log(err,"sdwcd")
        return conexao.rollback(() => {
          res.status(500).json({
            message: err.message,
          });
        });
      }

      if (result.affectedRows === 0) {
        return conexao.rollback(() => {
          res.status(404).json({
            message: "Departamento não encontrado",
          });
        });
      }

      const updateFuncionario = `
        UPDATE funcionarios
        SET id_departamento = 8
        WHERE id_departamento = ?
      `;

      conexao.query(updateFuncionario, [id], (err) => {
        if (err) {
          return conexao.rollback(() => {
            res.status(500).json({
              message: err.message,
            });
          });
        }

        conexao.commit((err) => {
          if (err) {
            return conexao.rollback(() => {
              res.status(500).json({
                message: err.message,
              });
            });
          }

          res.status(200).json({
            mensagem: "Departamento desativado com sucesso",
          });
        });
      });
    });
  });
};

module.exports = {
  getDepartaments,
  getDepartamentsPublic,
  postDepartaments,
  putDepartaments,
  getDepUser,
  deleteDepartament
};
