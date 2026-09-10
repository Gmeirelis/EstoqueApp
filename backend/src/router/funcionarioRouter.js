const express = require('express')
const router = express.Router()

const funcionarios = require("../controllers/funcionarioController")


router.get('/funcionarios',funcionarios.getFuncionario)
router.put('/funcionarios',funcionarios.modificarDadosFuncionario)

module.exports = router;