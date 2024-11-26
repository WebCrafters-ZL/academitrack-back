const bcrypt = require('bcrypt');
const { obterUsuarioIdDoToken } = require('../helpers/obterUsuarioIdDoToken.helper');
const Administrador = require('../models/administrador.model');
const Usuario = require('../models/usuario.model');

// Pesquisar administrador por ID
const obterPerfilAdministrador = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = obterUsuarioIdDoToken(token); // Obtém o usuarioId do token

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
const atualizarPerfilAdministrador = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = obterUsuarioIdDoToken(token); // Obtém o usuarioId do token

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
    obterPerfilAdministrador,
    atualizarPerfilAdministrador
};