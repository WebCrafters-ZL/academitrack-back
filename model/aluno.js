const mongoose = require('mongoose');
const Usuario = require('./usuario');


const AlunoSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    matricula: { type: String, required: true },
    curso: { type: String, required: true },
    periodo: { type: String, enum: ['matutino', 'vespertino', 'noturno'], required: true },
    disciplinas_matriculadas: [DisciplinaMatriculadaSchema]
  });
  
  const Aluno = mongoose.model('Aluno', AlunoSchema);
  
  module.exports = Aluno;