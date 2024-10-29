const mongoose = require('mongoose');
const { validarCPF } = require('../helpers/validadores');

const alunoSchema = new mongoose.Schema({
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
  dataNascimento: {
    type: Date,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  endereco: {
    type: String
  },
  matricula: {
    type: String,
    required: true,
    unique: true
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

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;
