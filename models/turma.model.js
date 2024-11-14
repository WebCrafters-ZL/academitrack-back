const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
  disciplina_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: true
  },
  professor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },
  alunos_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno'
  }],
  ano: {
    type: Number,
    required: true
  },
  semestre: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6]
  },
  capacidadeMaxima: {
    type: Number,
    default: 40
  }
}, {
  timestamps: true
});

// Middleware para validar o número máximo de alunos
turmaSchema.pre('save', function(next) {
  if (this.alunos.length > this.capacidadeMaxima) {
    const erro = new Error(`A turma excedeu a capacidade máxima de ${this.capacidadeMaxima} alunos.`);
    return next(erro);
  }
  next();
});

module.exports = mongoose.model('Turma', turmaSchema);
