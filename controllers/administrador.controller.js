const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importa a biblioteca jsonwebtoken
const Administrador = require('../models/administrador.model');
const Usuario = require('../models/usuario.model');

// Função para obter o usuarioId do token
const getUsuarioIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token
        return decoded.usuarioId; // Retorna o usuarioId do payload
    } catch (error) {
        return null; // Retorna null se o token não for válido
    }
};

// Pesquisar administrador por ID
const pesquisarAdministrador = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = getUsuarioIdFromToken(token); // Obtém o usuarioId do token

        if (!usuarioId) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const administrador = await Administrador.findOne({ usuario_id: usuarioId }).populate('usuario_id', 'email'); // Usa o usuarioId para buscar o administrador
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado' });
        }
        const administradorComEmail = {
            _id: administrador._id,
            nomeCompleto: administrador.nomeCompleto,
            cpf: administrador.cpf,
            email: administrador.usuario_id.email,
            status: administrador.status
        };
        res.status(200).json(administradorComEmail);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pesquisar administrador', error });
    }
};

// Atualizar administrador
const atualizarAdministrador = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = getUsuarioIdFromToken(token); // Obtém o usuarioId do token

        if (!usuarioId) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const { nomeCompleto, email, senha, cpf } = req.body;
        const administrador = await Administrador.findOne({ usuario_id: usuarioId }); // Usa o usuarioId para buscar o administrador

        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado' });
        }

        // Atualiza os dados do usuário
        const usuario = await Usuario.findById(administrador.usuario_id);
        if (email) usuario.email = email;
        if (senha) usuario.senha = await bcrypt.hash(senha, 10);
        await usuario.save();

        // Atualiza os dados do administrador
        if (nomeCompleto) administrador.nomeCompleto = nomeCompleto;
        if (cpf) administrador.cpf = cpf;
        await administrador.save();

        res.status(200).json({ message: 'Administrador atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar administrador', error });
    }
};

module.exports = {
    pesquisarAdministrador,
    atualizarAdministrador
};