const express = require('express');
const router = express.Router();
const { isLoggedIn, isProfessor } = require('../middlewares/auth.middleware');


module.exports = router;