const jwt = require('jsonwebtoken'); // Importa a biblioteca jsonwebtoken

// Função para obter o usuarioId do token
function obterUsuarioIdDoToken(token) {
    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token
        return decodificado.usuarioId; // Retorna o usuarioId do payload
    } catch (error) {
        return null; // Retorna null se o token não for válido
    }
};

module.exports = obterUsuarioIdDoToken; // Exporta a função para ser usada em outros arquivos