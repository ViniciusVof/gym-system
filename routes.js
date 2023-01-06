const express = require('express');
const UserController = require('./controllers/UserController');
const { verifyJWT } = require('./middleware/verifyJWT');
const routes = express.Router();

routes.post('/login', UserController.login);
routes.get('/users', verifyJWT, UserController.listAll);
routes.post('/users/create', UserController.create);

module.exports = routes;