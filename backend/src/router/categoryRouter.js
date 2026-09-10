const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')



router.get('/category',categoryController.getCategory)
router.post('/category',categoryController.postCategory)
router.delete('/category/:id',categoryController.deleteCategory)
router.put('/category/:id',categoryController.putCategory)

module.exports=router