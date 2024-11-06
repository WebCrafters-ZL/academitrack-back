const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware(['aluno']));

module.exports = router;