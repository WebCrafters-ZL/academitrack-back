const express = require('express');
const router = express.Router();

// Importar rotas de usuários
const userRoutes = require('./users/routes');

// Definir as rotas para os diferentes módulos
router.use('/users', userRoutes);

module.exports = router;
