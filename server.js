const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Middleware para CORS (opcional)
const { connectDB } = require('./config/db');

const routes = require('./routes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // Habilitar CORS (opcional)

// Servir arquivos estáticos, se necessário (ex: um build do React)
app.use(express.static(path.join(__dirname, 'public')));

// Prefixar todas as rotas com /api
app.use('/api', routes);

// Middleware para capturar erros 404 (rota não encontrada)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Middleware para lidar com erros gerais
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
