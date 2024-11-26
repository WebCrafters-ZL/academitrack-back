const express = require('express');
const professorController = require('../controllers/professor.controller');
const { isLoggedIn, isProfessor } = require('../middlewares/auth.middleware');
const router = express.Router();


router.get('/perfil', isLoggedIn, isProfessor, professorController.pesquisarProfessorPorIdToken);
router.put('/perfil', isLoggedIn, isProfessor, professorController.atualizarProfessor);

module.exports = router;