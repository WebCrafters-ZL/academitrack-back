const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes'); // Rota de autenticação
const administradorRoutes = require('./administrador.routes');
const professorRoutes = require('./professor.routes');
const alunoRoutes = require('./aluno.routes'); // Supondo que tenha rotas para aluno

// Definir rotas para cada tipo de usuário
router.use('/auth', authRoutes);
router.use('/administrador', administradorRoutes);
router.use('/professor', professorRoutes);
router.use('/aluno', alunoRoutes);

module.exports = router;
