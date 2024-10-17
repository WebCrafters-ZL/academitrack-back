const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: 'Muitas requisições feitas a partir deste IP, tente novamente mais tarde.'
});

module.exports = limiter;
