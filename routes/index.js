const express = require('express');
const router = express.Router();

const administradorRoutes = require('./administrador.routes');
const professorRoutes = require('./professor.routes');
const alunoRoutes = require('./aluno.routes'); // Supondo que tenha rotas para aluno
const authRoutes = require('./auth.routes'); // Rota de autenticação

// Definir rotas para cada tipo de usuário
router.use('/administrador', administradorRoutes);
router.use('/professor', professorRoutes);
router.use('/aluno', alunoRoutes);
router.use('/auth', authRoutes);

module.exports = router;
