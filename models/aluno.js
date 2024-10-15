const mongoose = require('mongoose');
const Usuario = require('./usuario');

const alunoSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  matricula: { type: String, required: true },
  curso: { type: String, required: true },
  periodo: { type: String, enum: ['matutino', 'vespertino', 'noturno'], required: true }
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;