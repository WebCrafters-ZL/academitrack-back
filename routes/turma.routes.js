const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turma.controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', isLoggedIn, isAdmin, turmaController.criarTurma);
router.get('/', isLoggedIn, turmaController.listarTurmas);
router.get('/:id', isLoggedIn, turmaController.obterTurma);
router.put('/:id', isLoggedIn, isAdmin, turmaController.atualizarTurma);
router.delete('/:id', isLoggedIn, isAdmin, turmaController.excluirTurma);
router.post('/:id/alunos', isLoggedIn, isAdmin, turmaController.adicionarAluno);
router.delete('/:id/alunos', isLoggedIn, isAdmin, turmaController.removerAluno);

module.exports = router;
