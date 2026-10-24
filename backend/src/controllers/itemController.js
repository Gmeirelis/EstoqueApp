const conexao = require("../config/db");
const { param } = require("../router/itemRouter");



const excluirItem = (req, res) => {
  const { id_item } = req.body;

  const updateSql = `
    UPDATE itens
    SET item_status = ?
    WHERE id_item = ?
  `

  conexao.query(updateSql, ["INATIVO", id_item], (erro, resultado) => {
    if (erro) {
      console.log("Erro ao desativar item:", erro);
      return res.status(500).send("Erro interno do servidor");
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).send("Item não encontrado");
    }

    return res.status(200).send("Item excluído com sucesso");
  });
};






// responsavel por renderizar na tabela de produtos adicionado
const getItensProdutos = (req, res) => {

  

  const sql = `
        SELECT 
      m.id_movimentacao,
      m.tipo,
      m.quantidade,
      m.observacao,
      m.data_movimentacao,
       i.id_item,
       i.item_status,
      i.item_nome,
      i.item_marca,
      i.item_modelo,
       i.situal_emprestimo,
      c.categoria_nome
    FROM movimentacoes m
    JOIN itens i ON m.id_item = i.id_item
    JOIN categorias c ON i.id_categoria = c.id_categoria
    WHERE item_status = "ATIVO"
    ORDER BY m.data_movimentacao DESC;
  `;

  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("Erro na consulta SQL:", err); // Dica: logar o 'err' ajuda a ver detalhes no console do backend
      return res.status(500).json({ mensagem: "erro interno" });
    }

    return res.status(200).json(resultado);
  });
};

const getItensSelect = (req, res) => {
  //const idDepartamento = req.usuario.id_departamento;

  const sql = `SELECT id_item,item_nome,item_status FROM itens
WHERE situal_emprestimo = "DISPONIVEL" && item_status="ATIVO" ;
  
  `;

  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro na consulta");
      return res.status(500).json({ mensagem: "erro interno" });
    }

    return res.status(200).json(resultado);
  });
};

const postItens = (req, res) => {
  const {
    nome,
    marca,
    modelo,
    id_categoria,
    descricao
  } = req.body;

  const sql = `
    INSERT INTO itens (
      item_nome,
      item_marca,
      item_modelo,
      id_categoria,
      item_descricao,
      item_status,
      situal_emprestimo
    )
    VALUES (?,?,?,?,?,?,?)
  `;
  conexao.query(
    sql,
    [
      nome,
      marca,
      modelo,
      id_categoria,
      descricao,
      "ATIVO",
      "DISPONIVEL",
    ],

    (err, resultado) => {
      if (err) {
        console.error("Erro ao criar produto:", err);

        return res.status(500).json({ mensagem: "Erro interno" });
      }

      const novoID = resultado.insertId;

      const sqlinsert = `

        INSERT INTO movimentacoes(id_item,id_usuario,tipo,quantidade,observacao)

        VALUES (?,?,?,?,?);

      `;

      conexao.query(
        sqlinsert,
        [ novoID, 7 , "ENTRADA", 1 ,"Cadastro inicial do item"],
        (errMovimento, result) => {
          if (errMovimento) {
            console.log("erro", errMovimento);

            // É uma boa prática colocar o status de erro aqui também!

            return res
              .status(500)
              .json({ mensagem: "Erro interno ao salvar log" });
          }

          // CORREÇÃO: Adicionadas as chaves {} no bloco do IF

          if (result.affectedRows === 0) {
            console.log({ mensagem: "o item nao foi adicionado no log" });

            return res
              .status(400)
              .json({ mensagem: "Item criado, mas o log falhou" });
          }

          const getItem = `
           select * from itens
            where id_item = ?
            `;
          conexao.query(getItem, [novoID], (erro, novoItem) => {
            if (erro) {
              console.log("erro na busca de dados", erro);

              return res.status(500).json({
                mensagem: "Erro interno no servidor",
              });
            }

            return res
              .status(200)
              .json({
                mensagem: "item criado com sucesso",
                dados: novoItem[0],
              });
          });
        },
      );
    },
  );
};


const deleteItens = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM itens WHERE id_itens = ?`;

  conexao.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error("erro ao deletar itens", err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "item não encontrado" });
    }
    return res.status(200).json({ mensagem: "item deletado" });
  });
};

const getResumoDashboard = (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN itens_status = 'Disponível' THEN 1 END) as disponiveis,
      COUNT(CASE WHEN itens_status = 'Em uso' THEN 1 END) as emUso,
      COUNT(CASE WHEN itens_status = 'Manutenção' THEN 1 END) as manutencao
    FROM itens;
  `;

  // Usando a sua variável "conexao"
  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro na consulta de resumo:", err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    // Como é só uma linha de resumo, enviamos a posição [0]
    return res.status(200).json(resultado[0]);
  });
};

// NOVA FUNÇÃO: Para a listagem de "Produtos Recentes"
const getItensRecentes = (req, res) => {
  const sql = `SELECT 
    *
FROM 
    movimentacoes m
INNER JOIN 
    itens i ON m.id_item = i.id_item
    order by id_movimentacao desc
LIMIT 5;`;

  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro na consulta de recentes:", err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    // Diferente da sua getItens, aqui mandei o resultado direto para
    // facilitar o .map() lá no React!
    return res.status(200).json(resultado);
  });
};


/*renderiza logs de produtos */
const itensLogs = (req, res) => {
  const sql = `SELECT 
    *
FROM 
   movimentacoes m
INNER JOIN 
    usuarios u ON m.id_usuario = u.id_usuario 
INNER JOIN 
    itens i ON m.id_item = i.id_item 
    ORDER BY m.id_movimentacao DESC LIMIT 5;
    `;

  conexao.query(sql, (err, resultado) => {
    if (err) {
      console.error("erro ao buscar dados", err);
      return res.status(500).json({ mensagem: "Internal Server Error" });
    }
    return res.status(200).json(resultado);
  });
  ("");
};

const itensRenderizar = (req, res) => {
  

  const sql = `
SELECT *
FROM itens
WHERE item_status IN ('ATIVO', 'MANUTENCAO')

`;

  conexao.query(sql,  (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: "error internal" });
    }
    return res.status(200).json(resultado);
  });
};

/*responsavel por mudar status de true para false*/
const updateAtivo = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE itens SET ativo = 0 WHERE id_itens = ?;`;

  conexao.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error("erro ao deletar itens", err);
      return res.status(500).json({ mensagem: "erro interno" });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "item não encontrado" });
    }
    return res.status(200).json({ mensagem: "item desativado" });
  });
};

const getCategoriaItens = (req, res) => {
  
  const getSql = `
  SELECT 
    c.id_categoria, 
    TRIM(c.categoria_nome) AS categoria_nome 
FROM itens i
JOIN categorias c ON i.id_categoria = c.id_categoria
GROUP BY c.id_categoria, c.categoria_nome;

  `;

  conexao.query(getSql, (err, resultado) => {
    if (err) {
      console.log("erro ao buscar  api ", err);
      return res.status(500).json({ mensagem: "error internal server" });
    }
    return res.status(200).json(resultado);
  });
};

const getCountCategory = (req, res) => {
  const getSql = `SELECT 
    c.categoria_nome,
    i.item_status,
    COUNT(*) AS total
FROM itens i
JOIN categorias c 
    ON i.id_categoria = c.id_categoria
WHERE i.item_status IN ('ATIVO', 'MANUTENCAO')
GROUP BY c.categoria_nome, i.item_status;`;

  conexao.query(getSql, (err, resultado) => {
    if (err) {
      console;
      log("erro na api", err);
      return res.status(500).json({ mensagem: "erro no servidor" });
    }
    return res.status(200).json(resultado);
  });
};

const getItemFilter =(req,res)=>{

const getsql = `
SELECT id_item,item_nome FROM itens;
`
conexao.query(getsql,(error,resultado)=>{
  if(error){
    console.log("erro na api",error);
    return res.status(500).send("erro interno servidor")
  }
 
   return res.status(200).json(resultado)

})

}

const selectProductCategory = (req,res)=>{

const getSql =`select * from itens i 
join categorias c on i.id_categoria = c.id_categoria
where item_status = "ATIVO";`

conexao.query(getSql,(err,resultado)=>{
  if(err){
  console.log('erro ao entregar os dados',err)
  return res.status(500).json({messagen:"erro internal serve"})
  }
  return res.status(200).json(resultado)
})
}





module.exports = {
  getItensProdutos,
  postItens,
  deleteItens,
  getResumoDashboard,
  getItensRecentes,
  itensLogs,
  itensRenderizar,
  updateAtivo,
  getItensSelect,
  getCategoriaItens,
  getCountCategory,
  getItemFilter,
  excluirItem,
  selectProductCategory
};
//return res.status(200).json({ resposta: "item atualizado" });//
