const express = require('express');
const professorController = require('../controllers/professor.controller');
const { isLoggedIn, hasRole } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/perfil', isLoggedIn, hasRole("professor"), professorController.obterPerfilProfessor);
router.put('/perfil', isLoggedIn, hasRole("professor"), professorController.atualizarPerfilProfessor);

module.exports = router;