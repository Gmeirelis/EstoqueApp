const conexao = require('../config/db')


const getMoviment = (req,res)=>{
    
const sql = `SELECT m.id_movimentacao,m.quantidade,m.tipo,i.item_nome,i.item_modelo,i.item_marca,u.nome,u.sobrenome FROM movimentacoes m
join itens i on m.id_item = i.id_item
join usuarios u on m.id_usuario = u.id_usuario
 `

conexao.query(sql,(err,resultado)=>{
    if(err){
console.error('erro ao consultar',err)
return res.status(500).json({mensagem:'internal erro'})
    }
    return res.status(200).json(resultado)
})

}

//total de moviemntação por data

const getDataMovimentacao = (req,res)=>{
    const sql =`select date(data_movimentacao) as data, count(*)as total from movimentacoes
GROUP BY DATE(data_movimentacao)
ORDER BY data`

conexao.query(sql,(err,resultado)=>{
    if(err){
        console.log("erro ao retornar os dados",err)
        return res.status(500).json({mensagem:"erro internal server"})
    }
    return res.status(200).json(resultado)
})
}

module.exports={
    getMoviment,
    getDataMovimentacao
}
