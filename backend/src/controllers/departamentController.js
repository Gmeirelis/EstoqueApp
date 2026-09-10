const conexao = require("../config/db");
const { param } = require("../router/departmentRouter");

/*read*/

/*autenticado */ 
const getDepartaments = (req, res) => {

const idDepartamento = req.usuario.id_departamento;

  const sql = `SELECT * FROM departamentos
  where id_departamento = ?
  `;

  conexao.query(sql,[idDepartamento] ,(err, resultado) => {
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

  const sql = `INSERT INTO departamentos (nome) VALUES(?)`;

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
    UPDATE departamentos
    SET 
      nome = ?
    WHERE id_departamento = ?
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

const deleteDeparatments = (req, res) => {
  const { id } = req.params;

  if (id == 3) {
    return res.status(400).json({
      mensagem: "O departamento Sem Departamento não pode ser excluído"
    });
  }


 const atualizarUsuarios = `
    UPDATE usuarios 
    SET id_departamento = 3
    WHERE id_departamento = ?
`;
    conexao.query(atualizarUsuarios,[id],(err)=>{

if(err){
  console.error('erro ao mudar o departamento do usuario para o sem departamento')
  return res.status(500).json({mensagem:'erro interno'})
}


const dropDerpataments=`
    DELETE  FROM departamentos
    WHERE id_departamento = ?
`


conexao.query(dropDerpataments,[id],(err,resultado)=>{


if(err){
  console.error('erro ao excluir o departamento')
  return res.status(500).json({mensagem:'erro interno'})
}

if(resultado.affectedRows === 0){
  return res.status(404).json({mensagem:'departamento não encontrado'})
}

return res.status(200).json({mensagem:"departamento excluido"})


})


})



};

 const  getDepartamentsPublic = (req,res) =>{

const getSql = `SELECT* FROM departamentos`


conexao.query(getSql,(err,resultado)=>{
  if(err){
    console.log(err)
    return res.status(500).json({mensagem:"erro interno"})
  }
  return res.status(200).json(resultado)
})

 }

module.exports = {
  getDepartaments,
  getDepartamentsPublic,
  postDepartaments,
  putDepartaments,
  deleteDeparatments,
};
