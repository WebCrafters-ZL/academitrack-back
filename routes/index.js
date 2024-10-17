const express = require('express');
const router = express.Router();

const administradorRoutes = require('./administrador/routes');
const authRoutes = require('./authRoutes');  // Adicionando a rota de autenticação

router.use('/administrador', administradorRoutes);
router.use('/auth', authRoutes);  // Usando a rota de autenticação

module.exports = router;
