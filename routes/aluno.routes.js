const express = require('express');
const { alunoController } = require('../controllers/aluno.controller');
const { isLoggedIn, hasRole } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/perfil', isLoggedIn, hasRole("aluno"), alunoController.obterPerfilAluno);
router.put('/perfil', isLoggedIn, hasRole("aluno"), alunoController.atualizarPerfilAluno);

module.exports = router;