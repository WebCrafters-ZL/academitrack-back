const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../../controllers/userController');

// Criar um novo usuário
router.post('/', createUser); // POST /api/users

// Obter todos os usuários
router.get('/', getUsers); // GET /api/users

// Obter um usuário por ID
router.get('/:userId', getUserById); // GET /api/users/:userId

// Atualizar um usuário por ID
router.put('/:userId', updateUserById); // PUT /api/users/:userId

// Deletar um usuário por ID
router.delete('/:userId', deleteUserById); // DELETE /api/users/:userId

module.exports = router;
