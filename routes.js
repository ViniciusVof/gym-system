const express = require('express');
const UserController = require('./controllers/UserController');
const { verifyJWT } = require('./middleware/verifyJWT');
const routes = express.Router();

// Usuários
routes.post('/login', UserController.login);
routes.post('/users', verifyJWT, UserController.create);
routes.get('/users', verifyJWT, UserController.listAll);
routes.get('/users/:id', verifyJWT, UserController.listOne);
routes.put('/users/:id', verifyJWT, UserController.update);
routes.delete('/users/:id', verifyJWT, UserController.delete);

module.exports = routes;