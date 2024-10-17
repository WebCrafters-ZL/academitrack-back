const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const routes = require('./routes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Limitar requisições a 100 por 15 minutos por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições feitas a partir deste IP, tente novamente mais tarde.'
});

// Aplica o rate limit a todas as rotas
app.use(limiter);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // Habilitar CORS (opcional)

// Servir arquivos estáticos, se necessário (ex: um build do React)
app.use(express.static(path.join(__dirname, 'public')));

// Prefixar todas as rotas com /api/v1
app.use('/api/v1', routes);

// Middleware para capturar erros 404 (rota não encontrada)
app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
});

// Middleware para lidar com erros gerais
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
    }

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
