const jwt = require('jsonwebtoken');

// Middleware para verificar o token e o tipo de usuário
const authMiddleware = (permittedTypes) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Acesso negado, token não fornecido.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuarioId = decoded.usuarioId;
            req.tipoUsuario = decoded.tipoUsuario;

            // Verifica se o tipo de usuário tem permissão
            if (!permittedTypes.includes(req.tipoUsuario)) {
                return res.status(403).json({ error: 'Acesso negado, permissões insuficientes.' });
            }

            next();
        } catch (error) {
            res.status(401).json({ error: 'Token inválido.' });
        }
    };
};

module.exports = authMiddleware;
