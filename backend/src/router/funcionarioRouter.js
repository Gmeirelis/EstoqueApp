const express = require('express')
const router = express.Router()

const funcionarios = require("../controllers/funcionarioController")


router.get('/funcionarios',funcionarios.getFuncionario) // renderiza a tabela de funcionario

router.put('/funcionario/:id_funcionario',funcionarios.deleteFuncionario)

router.put('/funcionarios',funcionarios.modificarDadosFuncionario)
router.post('/funcionarios',funcionarios.createrFuncionarios)
module.exports = router;