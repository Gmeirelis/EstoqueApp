
const conexao = require('../config/db')
//const { param } = require("../router/itemRouter")


// renderiza a tabela de funcionario
const getFuncionario = (req,res) =>{

const sql =`select f.id_funcionario,f.funcionario_nome,f.email,f.telefone,f.cargo,d.departamento_nome from funcionarios f
join departamentos d on f.id_departamento = d.id_departamento`

conexao.query(sql,(err,resultado)=>{
    if(err){
        console.log('erro buscar dados',err)
        res.status(500).json({mensagem:"erro internal server"})
    }
    return res.status(200).json(resultado)
})
}


const modificarDadosFuncionario = (req, res) => {
  const { id_funcionario, funcionario_nome, email, cargo } = req.body;

  const sql = `UPDATE funcionarios 
    SET 
      funcionario_nome = ?,
      email = ?,
      cargo = ?
    WHERE id_funcionario = ?`;

  // As variáveis foram colocadas dentro de um Array [] na ordem dos '?'
  conexao.query(
    sql,
    [funcionario_nome, email, cargo, id_funcionario],
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


module.exports ={
    getFuncionario,
    modificarDadosFuncionario
}