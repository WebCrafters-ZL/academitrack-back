const mongoose = require('mongoose');
const Usuario = require('./usuario');

const ProfessorSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    departamento: { type: String, required: true },
    disciplinas: [DisciplinaLecionadaSchema]
  });

  const Professor = mongoose.model('Professor', ProfessorSchema);

  module.exports = Professor; 