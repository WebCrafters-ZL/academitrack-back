const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  dataCadastro: { type: Date, default: Date.now },
  dataAtualizacao: { type: Date, default: Date.now }
});

administradorSchema.pre('save', function(next) {
  this.dataAtualizacao = new Date();
  next();
});

const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;
