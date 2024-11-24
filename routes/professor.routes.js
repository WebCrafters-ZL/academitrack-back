const express = require('express');
const professorController = require('../controllers/professor.controller');
const { isLoggedIn } = require('../middlewares/auth.middleware');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware(['professor']));

router.get('/perfil', isLoggedIn, professorController.pesquisarProfessorPorIdToken);

module.exports = router;