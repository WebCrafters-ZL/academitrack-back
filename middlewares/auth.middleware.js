const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado, token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = {
      id: decoded.usuarioId,
      tipo: decoded.tipoUsuario
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.tipo === 'administrador') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado, permissões insuficientes.' });
  }
};

exports.hasRole = (roles) => {
  return (req, res, next) => {
    if (req.usuario && roles.includes(req.usuario.tipo)) {
      next();
    } else {
      res.status(403).json({ error: 'Acesso negado, permissões insuficientes.' });
    }
  };
};
