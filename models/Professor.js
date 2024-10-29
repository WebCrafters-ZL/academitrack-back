const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  formacaoAcademica: { type: String, required: true },
  especialidade: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm'
  }
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
