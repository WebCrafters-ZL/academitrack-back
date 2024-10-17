const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String },
  matricula: { type: String, required: true, unique: true },
  curso: { type: String, required: true },
  periodo: { type: Number, required: true },
  dataMatricula: { type: Date, required: true },
  situacaoMatricula: { type: String, enum: ['ativo', 'trancado', 'jubilado'], default: 'ativo' },
  historicoEscolar: [{
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' },
    nota: { type: Number, min: 0, max: 10 },
    frequencia: { type: Number, min: 0, max: 100 }
  }],
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  dataCadastro: { type: Date, default: Date.now },
  dataAtualizacao: { type: Date, default: Date.now }
});

alunoSchema.pre('save', function (next) {
  this.dataAtualizacao = new Date();
  next();
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;
