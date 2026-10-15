const conexao = require("../config/db");
const { param } = require("../router/itemRouter");

/* criar um novo emprestimo */
/* criar um novo empréstimo */


const postEmprestimo = (req, res) => {

  const {
    id_item,
    id_funcionario,
    data_emprestimo,
    devolucao,
    observacao,
  } = req.body;




  // =========================
  // 1. VALIDAÇÃO
  // =========================

  if (!id_item || !id_funcionario || !data_emprestimo || !devolucao) {
    return res.status(400).json({
      mensagem: "Dados incompletos.",
    });
  }

  // =========================
  // 2. INICIAR TRANSAÇÃO
  // =========================

  conexao.beginTransaction((err) => {
    if (err) {
      console.error("Erro ao iniciar transação:", err);

      return res.status(500).json({
        mensagem: "Erro no servidor ao processar o empréstimo.",
      });
    }

    inserirEmprestimo();
  });

  // =========================
  // 3. INSERIR EMPRÉSTIMO
  // =========================

  function inserirEmprestimo() {
    const sql = `
      INSERT INTO emprestimos (
        id_item,
        id_funcionario,
        id_usuario,
        data_emprestimo,
        data_prevista_devolucao,
        status,
        observacao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      id_item,
      id_funcionario,
      idUsuario,
      data_emprestimo,
      devolucao,
      "EMPRESTADO",
      observacao,
    ];

    conexao.query(sql, valores, (err, resultado) => {
      if (err) {
        return rollback(
          "Erro ao inserir empréstimo:",
          "Erro ao registrar o empréstimo."
        );
      }

      const idEmprestimo = resultado.insertId;

      console.log("ID do empréstimo criado:", idEmprestimo);

      atualizarItem(idEmprestimo);
    });
  }

  // =========================
  // 4. ATUALIZAR ITEM
  // =========================

  function atualizarItem(idEmprestimo) {
    const sql = `
      UPDATE itens
      SET situal_emprestimo = 'INDISPONIVEL'
      WHERE id_item = ?
    `;

    conexao.query(sql, [id_item], (err, resultado) => {
      if (err) {
        return rollback(
          "Erro ao atualizar estoque:",
          "Erro ao atualizar o estoque."
        );
      }

      if (resultado.affectedRows === 0) {
        return rollback(
          "Item não encontrado.",
          "Item não encontrado.",
          400
        );
      }

      buscarEmprestimo(idEmprestimo);
    });
  }

  // =========================
  // 5. BUSCAR EMPRÉSTIMO
  // =========================

  function buscarEmprestimo(idEmprestimo) {
    const sql = `
      SELECT
        e.id_emprestimo,
        e.data_emprestimo,
        e.data_prevista_devolucao,
        e.status,
        e.observacao,

        f.funcionario_nome,

        d.departamento_nome,

        i.item_nome,
        i.item_modelo

      FROM emprestimos e

      JOIN funcionarios f
        ON e.id_funcionario = f.id_funcionario

      JOIN itens i
        ON e.id_item = i.id_item

      JOIN departamentos d
        ON f.id_departamento = d.id_departamento

      WHERE e.id_emprestimo = ?
    `;

    conexao.query(sql, [idEmprestimo], (err, resultado) => {
      if (err) {
        return rollback(
          "Erro ao buscar empréstimo criado:",
          "Erro ao buscar os dados do empréstimo criado."
        );
      }

      registrarMovimentacao(idEmprestimo, resultado[0]);
    });
  }

  // =========================
  // 6. REGISTRAR MOVIMENTAÇÃO
  // =========================

  function registrarMovimentacao(idEmprestimo, dadosEmprestimo) {
    const sql = `
      INSERT INTO movimentacoes (
        id_item,
        id_usuario,
        tipo,
        quantidade,
        observacao
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [
      id_item,
      idUsuario,
      "SAIDA",
      1,
      observacao,
    ];

    conexao.query(sql, valores, (err) => {
      if (err) {
        return rollback(
          "Erro ao criar movimentação:",
          "Erro ao registrar movimentação."
        );
      }

      finalizarTransacao(dadosEmprestimo);
    });
  }

  // =========================
  // 7. COMMIT
  // =========================

  function finalizarTransacao(dadosEmprestimo) {
    conexao.commit((err) => {
      if (err) {
        return conexao.rollback(() => {
          console.error("Erro no COMMIT:", err);

          return res.status(500).json({
            mensagem: "Erro ao finalizar o empréstimo.",
          });
        });
      }

      return res.status(201).json({
        mensagem:
          "Empréstimo realizado com sucesso e estoque atualizado!",
        dados: dadosEmprestimo,
      });
    });
  }

  // =========================
  // 8. ROLLBACK
  // =========================

  function rollback(
    erroConsole,
    mensagem,
    status = 500
  ) {
    return conexao.rollback(() => {
      console.error(erroConsole);

      return res.status(status).json({
        mensagem,
      });
    });
  }
};

/* função para devolução de item */
const puttDevoluçao = (req, res) => {
  const { id_emprestimo, id_item } = req.body;

  // vai fazer o update na tabela emprestimos
  const InsertSQlupdate = `
    UPDATE emprestimos
    SET status = "DEVOLVIDO"
    WHERE id_emprestimo = ?;
  `;

  conexao.query(InsertSQlupdate, [id_emprestimo], (err) => {
    if (err) {
      console.log("erro", err);
      return res.status(500).json("error internal 500");
    }

    // vai fazer update na tabela item
    const SqlUpdateItem = `
      UPDATE itens
      SET situal_emprestimo = "DISPONIVEL"
      WHERE id_item = ?;
    `;

    conexao.query(SqlUpdateItem, [id_item], (err) => {
      if (err) {
        console.log("erro ao atualizar na tabela item", err);
        return res.status(500).json("erro server internal");
      }

      return res.status(200).json("item devolvido");
    });
  });
};

/* responsalvel por renderizar a lista de item emprestado */
const getEmprestimo = (req, res) => {
  const sqlGet = `SELECT
 e.id_emprestimo,
e.data_emprestimo,
e.data_prevista_devolucao,
e.status,
i.id_item,
i.item_nome,
i.item_marca,
i.item_modelo,
i.item_descricao,
f.funcionario_nome,
f.cargo,
f.id_departamento,
d.departamento_nome
 FROM emprestimos e
join itens i on e.id_item = i.id_item
join usuarios u on e.id_usuario = u.id_usuario
join funcionarios f on e.id_funcionario = f.id_funcionario
join departamentos d on f.id_departamento = d.id_departamento
where status = "EMPRESTADO"`;

  conexao.query(sqlGet, (error, resultado) => {
    if (error) {
      console.log("erro ao buscar api", error);
      return res.status(500).json({ mensagem: "error internal" });
    }
    return res.status(200).json(resultado);
  });
};

const selectEmprestimo = (req, res) => {
  const getsql = `
SELECT e.id_emprestimo,f.funcionario_nome,d.departamento_nome FROM emprestimos e

JOIN funcionarios f ON e.id_funcionario = f.id_funcionario

JOIN departamentos d on f.id_departamento = d.id_departamento;;

`;

  conexao.query(getsql, (err, resultado) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ mensagem: "erro internal" });
    }

    return res.status(200).json(resultado);
  });
};

module.exports = {
  postEmprestimo,
  getEmprestimo,
  selectEmprestimo,
  puttDevoluçao,
};
