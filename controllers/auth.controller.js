const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Usuario = require('../models/usuario.model');
const transporter = require('../config/mailer');  // Importando o transporter

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        const token = jwt.sign(
            { usuarioId: usuario._id, tipoUsuario: usuario.tipoUsuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};

const logout = (req, res) => {
    // O logout é tratado no front-end ao remover o token
    res.json({ message: 'Logout bem-sucedido.' });
};

const solicitarRedefinicaoSenha = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        usuario.resetSenhaToken = resetToken;
        usuario.resetSenhaExpira = Date.now() + 3600000;
        await usuario.save();

        const mailOptions = {
            from: 'noreply@academitrack.edu.br',
            to: email,
            subject: 'Redefinição de Senha',
            text: `Redefina sua senha clicando no link:\nhttp://localhost:8080/redefinir-senha/${resetToken}`
        };

        await transporter.sendMail(mailOptions); // Usando o transporter importado

        res.json({ message: 'E-mail de redefinição de senha enviado.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};

const redefinirSenha = async (req, res) => {
    const { token } = req.params;
    const { novaSenha } = req.body;

    try {
        const usuario = await Usuario.findOne({
            resetSenhaToken: token,
            resetSenhaExpira: { $gt: Date.now() }
        });

        if (!usuario) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        usuario.senha = await bcrypt.hash(novaSenha, 10);
        usuario.resetSenhaToken = undefined;
        usuario.resetSenhaExpira = undefined;
        await usuario.save();

        res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};

module.exports = {
    login,
    logout,
    solicitarRedefinicaoSenha,
    redefinirSenha
};
