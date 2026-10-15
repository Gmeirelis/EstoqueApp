const autenticar = require("../middleware/authuser")
const express = require('express')
const router = express.Router()
const emprestimoController = require('../controllers/emprestimoController')

 // const autenticar = require('../middleware/authuser')

router.post('/emprestimo',emprestimoController.postEmprestimo) // adicionar emprestimo
router.get('/emprestimo/selectnome',emprestimoController.selectEmprestimo) // rota publica
router.get('/emprestimo',emprestimoController.getEmprestimo) // renderizar na tabela de emprestimo
router.put('/devolutionItem',emprestimoController.puttDevoluçao)

module.exports =router