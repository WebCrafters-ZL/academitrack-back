const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  remetente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrador', 
    required: true
  },
  destinatario_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turma', 
  }],
  assunto: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm'
  }
});

module.exports = mongoose.model('Mensagem', mensagemSchema);
