const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  formacaoAcademica: { type: String, required: true },
  especialidade: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String },
  matricula: { type: String, required: true, unique: true },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }],
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm'
  }
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
