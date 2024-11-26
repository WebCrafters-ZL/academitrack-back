const express = require('express');
const { authController } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/esqueci-senha', authController.solicitarRedefinicaoSenha);
router.post('/redefinir-senha/:token', authController.redefinirSenha);

module.exports = router;
