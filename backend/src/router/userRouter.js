const express = require('express');
const rota = express.Router();
const autenticar = require('../middleware/authuser')
const userController = require('../controllers/userController');

rota.post('/user/creatUser', userController.createUser); // funcionando

rota.get('/user',userController.getUser) // funcionando

rota.post('/user/loginUser',userController.loginUser)

rota.put('/user/:id',userController.updateUser) // funcionando

rota.delete('/user/:id', userController.deleteUser) // funcionando

rota.get('/user/me', autenticar,userController.getUsuarioLogado)

module.exports = rota;