require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { connectDB } = require('./config/db');
const routes = require('./routes');
const rateLimit = require('./config/rateLimit');  // Importando o rate limit de config
require('dotenv').config();

const app = express();

// Conectar ao banco de dados
connectDB();

// Aplica o rate limit a todas as rotas
app.use(rateLimit);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurando CORS com opções
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS.split(','),
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
    res.status(error.status || 500);

    if (process.env.NODE_ENV === 'development') {
        return res.json({
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }

    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
