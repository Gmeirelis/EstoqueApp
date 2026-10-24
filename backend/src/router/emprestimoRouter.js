const autenticar = require("../middleware/authuser")
const express = require('express')
const router = express.Router()
const emprestimoController = require('../controllers/emprestimoController')

 

router.post('/emprestimo',autenticar,emprestimoController.postEmprestimo) // adicionar emprestimo
router.get('/emprestimo/selectnome',emprestimoController.selectEmprestimo) // rota publica
router.get('/emprestimo',emprestimoController.getEmprestimo) // renderizar na tabela de emprestimo
router.put('/devolutionItem',emprestimoController.puttDevoluçao)
router.get('/emprestimoAtrasado',emprestimoController.getEmprestimoAtrasado)
module.exports =router