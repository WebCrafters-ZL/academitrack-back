const mongoose = require('mongoose');
const { usuarioSchema } = require('../models/usuario');

const Usuario = mongoose.model('User', usuarioSchema);

// Criar um novo usuário
const criarUsuario = async (req, res) => {
    try {
        const newUsuario = new Usuario(req.body);
        const savedUsuario = await newUsuario.save();
        res.status(201).json(savedUsuario); // Status 201 indica que o recurso foi criado
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: err });
    }
};

// Obter todos os usuários
const obterTodosOsUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter usuários', error: err });
    }
};

// Obter um usuário por e-mail
const obterUsuarioPorEmail = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.params.email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter o usuário', error: err });
    }
};

// Atualizar um usuário por ID
const atualizarUsuarioPorId = async (req, res) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.usuarioId, req.body, {
            new: true,
            useFindAndModify: false,
        });
        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(updatedUsuario);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error: err });
    }
};

// Deletar um usuário por ID
const excluirUsuarioPorId = async (req, res) => {
    try {
        const deletedUsuario = await Usuario.deleteOne({ _id: req.params.userId });
        if (!deletedUsuario.deletedCount) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir o usuário', error: err });
    }
};

module.exports = {
    criarUsuario,
    obterTodosOsUsuarios,
    obterUsuarioPorEmail,
    atualizarUsuarioPorId,
    excluirUsuarioPorId
};
