
const conexao = require('../config/db');
const { param } = require("../router/itemRouter");


/* criar um novo emprestimo */
/* criar um novo empréstimo */
const postEmprestimo = (req, res) => {
  const {
    id_item,
    id_funcionario,
    data_emprestimo,
    devolucao,
    observacao
  } = req.body;

  console.log("POST /emprestimo chegou");
  console.log("BODY:", req.body);

  // Validação
  if (
    !id_item ||
    !id_funcionario ||
    !data_emprestimo ||
    !devolucao
  ) {
    return res.status(400).json({
      mensagem: "Dados incompletos."
    });
  }

  // Inicia transação
  conexao.beginTransaction((errTransaction) => {

    if (errTransaction) {
      console.error(
        "Erro ao iniciar transação:",
        errTransaction
      );

      return res.status(500).json({
        mensagem: "Erro no servidor ao processar o empréstimo."
      });
    }

    // 1️⃣ INSERIR EMPRÉSTIMO
    const sqlInsert = `
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

    conexao.query(
      sqlInsert,
      [
        id_item,
        id_funcionario,
        1,
        data_emprestimo,
        devolucao,
        "EMPRESTADO",
        observacao
      ],
      (errInsert, resultadoInsert) => {

        if (errInsert) {

          return conexao.rollback(() => {

            console.error(
              "Erro no INSERT do empréstimo:",
              errInsert
            );

            res.status(500).json({
              mensagem: "Erro ao registrar o empréstimo."
            });

          });

        }

        // ID do empréstimo recém-criado
        const idEmprestimo = resultadoInsert.insertId;

        console.log(
          "ID do empréstimo criado:",
          idEmprestimo
        );

        // 2️⃣ ATUALIZAR STATUS DO ITEM
        const sqlUpdate = `
          UPDATE itens
          SET situal_emprestimo = 'INDISPONIVEL'
          WHERE id_item = ?
        `;

        conexao.query(
          sqlUpdate,
          [id_item],
          (errUpdate, resultadoUpdate) => {

            if (errUpdate) {

              return conexao.rollback(() => {

                console.error(
                  "Erro ao atualizar estoque:",
                  errUpdate
                );

                res.status(500).json({
                  mensagem: "Erro ao atualizar o estoque."
                });

              });

            }

            // Verifica se o item realmente existe
            if (resultadoUpdate.affectedRows === 0) {

              return conexao.rollback(() => {

                res.status(400).json({
                  mensagem: "Item não encontrado."
                });

              });

            }

            // 3️⃣ BUSCAR O EMPRÉSTIMO CRIADO
            const sqlBuscarEmprestimo = `
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

            conexao.query(
              sqlBuscarEmprestimo,
              [idEmprestimo],
              (errBusca, resultadoBusca) => {

                if (errBusca) {

                  return conexao.rollback(() => {

                    console.error(
                      "Erro ao buscar empréstimo criado:",
                      errBusca
                    );

                    res.status(500).json({
                      mensagem:
                        "Erro ao buscar os dados do empréstimo criado."
                    });

                  });

                }

                console.log("RESULTADO DO SELECT:", resultadoBusca);

                // 4️⃣ CONFIRMAR TRANSAÇÃO
                conexao.commit((errCommit) => {

                  if (errCommit) {

                    return conexao.rollback(() => {

                      console.error(
                        "Erro no COMMIT:",
                        errCommit
                      );

                      res.status(500).json({
                        mensagem:
                          "Erro ao finalizar o empréstimo."
                      });

                    });

                  }

                  // 5️⃣ RETORNAR PARA O REACT
                  return res.status(201).json({
                    mensagem:
                      "Empréstimo realizado com sucesso e estoque atualizado!",

                    dados: resultadoBusca[0]
                  });

                });

              }
            );

          }
        );

      }
    );

  });
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
const getEmprestimo = (req,res) =>{


 const sqlGet =`SELECT
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
where status = "EMPRESTADO"`

conexao.query(sqlGet,(error,resultado)=>{
  if(error){
  console.log('erro ao buscar api', error)
  return res.status(500).json({mensagem:'error internal'})
  }
  return res.status(200).json(resultado)
})
}


const selectEmprestimo = (req,res) =>{


const getsql = `
SELECT e.id_emprestimo,f.funcionario_nome,d.departamento_nome FROM emprestimos e
JOIN funcionarios f ON e.id_funcionario = f.id_funcionario
JOIN departamentos d on f.id_departamento = d.id_departamento;

`

conexao.query(getsql,(err,resultado)=>{


if(err){
  console.log(err)
  return res.status(500).json({mensagem:"erro internal"})
}

return res.status(200).json(resultado)

})
}




module.exports = {
  postEmprestimo,
  getEmprestimo,
 selectEmprestimo,
  puttDevoluçao
};