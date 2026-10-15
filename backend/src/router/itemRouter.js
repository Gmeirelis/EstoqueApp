const express = require('express')
const router = express.Router()

const itensRota = require('../controllers/itemController')
//const autenticar = require('../middleware/authuser')

router.get('/itens/porCategoria',itensRota.getCountCategory)
router.get('/product/itens/produtos',itensRota.getItensProdutos) // renderizar na tabela produto
router.get('/product/itens',itensRota.itensRenderizar) // renderizar no dashboard
router.get('/dashboard/resumo',itensRota.getResumoDashboard)
router.get('/dashboard/productRecent',itensRota.getItensRecentes)
router.get('/dashboard/productLogs',itensRota.itensLogs)
//router.get('/itens',itensRota.getItens) // lista todos os itens 
router.post('/itens/addProduct',itensRota.postItens) /*essa rota e responsavel pelo adição de produto e adicionar na tabela movimentaços como entrada*/

router.delete('/itens/:id',itensRota.deleteItens)
//router.put('/itens/false/:id',itensRota.updateAtivo)
router.get('/itens/selectItem',itensRota.getItensSelect)
router.put('/itens/excluir',itensRota.excluirItem)
  
// rota dos filtro tabela de produto
router.get('/product/itens/categoria',itensRota.getItensProdutos)// renderizar a lista de categoria 
router.get('/item/filter',itensRota.getItemFilter)
router.get('/item/category',itensRota.selectProductCategory)

module.exports = router