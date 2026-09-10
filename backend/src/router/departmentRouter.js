const express = require('express')
const router = express.Router()

const autenticar = require('../middleware/authuser')

const departamentos = require("../controllers/departamentController")

router.get('/departamentos',autenticar,departamentos.getDepartaments) // rota privada

router.get('/departamentos/public',departamentos.getDepartamentsPublic) // rota publica

router.post('/departamentos',departamentos.postDepartaments)
router.put('/departamentos/:id',departamentos.putDepartaments)
router.delete('/departamentos/:id',departamentos.deleteDeparatments)

module.exports = router