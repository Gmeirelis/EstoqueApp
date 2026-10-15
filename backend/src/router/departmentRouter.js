const express = require('express')
const router = express.Router()

//const autenticar = require('../middleware/authuser')

const departamentos = require("../controllers/departamentController")

router.get('/departamentos',departamentos.getDepartaments) // rota privada

router.get('/departamentos/public',departamentos.getDepartamentsPublic) // rota publica

router.post('/departamentos',departamentos.postDepartaments)
router.put('/departamentos/:id',departamentos.putDepartaments)  //rota para alterar nome do departamento
router.get('/department/:id',departamentos.getDepUser)
router.patch('/departamento/:id',departamentos.deleteDepartament) // rota para desativar departamento

module.exports = router