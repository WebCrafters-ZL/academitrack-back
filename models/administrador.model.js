const mongoose = require('mongoose');
const { validarCPF } = require('../helpers/validarCpf.helper');

const administradorSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: true
  },
  cpf: {
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function (v) {
        return validarCPF(v);
      },
      message: props => `${props.value} não é um CPF válido!`
    }
  },
  status: {
    type: String,
    enum: ['ativo', 'inativo'], default: 'ativo'
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
},
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm'
    }
  });

const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;
