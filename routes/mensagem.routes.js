const express = require('express');
const roteador = express.Router();
const mensagemController = require('../controllers/mensagem.controller');

// **Mensagens para todas as turmas**
roteador.post('/enviar/todas', mensagemController.enviarMensagemParaTodasTurmas); // Enviar mensagem para todas as turmas
roteador.get('/listar/todas', mensagemController.listarMensagensParaTodasTurmas); // Listar mensagens para todas as turmas
roteador.delete('/excluir/todas/:mensagemId', mensagemController.excluirMensagemDeTodasTurmas); // Excluir mensagem de todas as turmas

// **Mensagens para uma unica turma **
roteador.post('/enviar/:turmaId', mensagemController.enviarMensagemParaTurma); // Enviar mensagem para uma unica turma
roteador.get('/listar/:turmaId', mensagemController.listarMensagensPorTurma); // Listar mensagens de uma unica turma 
roteador.delete('/excluir/:turmaId/:mensagemId', mensagemController.excluirMensagemDaTurma); // Excluir mensagem de uma unica turma 
module.exports = roteador;
