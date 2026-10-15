
const e = require('express')
const conexao = require('../config/db')



// renderiza a tabela de funcionario
const getFuncionario = (req,res) =>{

const sql =`select f.id_funcionario,f.funcionario_nome,f.email,f.telefone,f.cargo,f.funcionario_status,d.departamento_nome from funcionarios f
join departamentos d on f.id_departamento = d.id_departamento
where funcionario_status = "ATIVO";`

conexao.query(sql,(err,resultado)=>{
    if(err){
        console.log('erro buscar dados',err)
        res.status(500).json({mensagem:"erro internal server"})
    }
    return res.status(200).json(resultado)
})
}


const modificarDadosFuncionario = (req, res) => {
  const { id_funcionario, funcionario_nome, email, cargo,id_departamento } = req.body;

  const sql = `UPDATE funcionarios 
    SET 
      funcionario_nome = ?,
      email = ?,
      cargo = ?,
      id_departamento =?
    WHERE id_funcionario = ?`;

  // As variáveis foram colocadas dentro de um Array [] na ordem dos '?'
  conexao.query(
    sql,
    [funcionario_nome, email, cargo,id_departamento, id_funcionario],
    (error, resposta) => {
      if (error) {
        console.log('Erro ao atualizar as informações:', error);
        return res
          .status(500)
          .json({ mensagem: 'Erro interno do servidor' });
      }

      return res
        .status(200)
        .json({ mensagem: 'Funcionário atualizado com sucesso!', resposta });
    }
  );
};


const createrFuncionarios = (req,res) =>{

const {funcionario_nome,email,telefone,cargo,id_departamento} = req.body

const postSql = `INSERT INTO funcionarios
(
    funcionario_nome,
    email,
    telefone,
    cargo,
    id_departamento,
    ativo
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    1
);`

conexao.query(postSql,[funcionario_nome,email,telefone,cargo,id_departamento],(err,resposta)=>{
  if(err){
    console.log('error',err)
    return res.status(500).json({messagem:"error internal server"})
  }
  return res.status(201).json(resposta)
})

}

//apagar usuario

const deleteFuncionario = (req,res) =>{

const { id_funcionario } = req.params;

const sqlPut = `update funcionarios
set funcionario_status = "INATIVO"
where id_funcionario = ?;

`
conexao.query(sqlPut,[id_funcionario],(err,resultado)=>{
  if(err){
    console.log('erro',err)
    return res.status(500).json({message:"erro interno serve"})
  }
  return res.status(200).json({message:"usuario apagado"})
})

}



module.exports ={
    getFuncionario,
    modificarDadosFuncionario,
    createrFuncionarios,
    deleteFuncionario
}