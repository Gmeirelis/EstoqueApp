const express = require('express')
const router = express.Router()

const movimentController = require('../controllers/movementController')

router.get('/movimentos',movimentController.getMoviment)
router.get('/movimentos/porData',movimentController.getDataMovimentacao)

module.exports=router