const express = require('express');
const TeacherController = require('./controllers/TeacherController');
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

// Professores
routes.post('/teachers', verifyJWT, TeacherController.create);
routes.get('/teachers', verifyJWT, TeacherController.listAll);
routes.get('/teachers/:id', verifyJWT, TeacherController.listOne);
routes.put('/teachers/:id', verifyJWT, TeacherController.update);
routes.delete('/teachers/:id', verifyJWT, TeacherController.delete);

module.exports = routes;