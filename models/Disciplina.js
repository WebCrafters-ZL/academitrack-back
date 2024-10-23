const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    cargaHoraria: { type: Number, required: true },
    curso_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
    dataCadastro: { type: Date, default: Date.now },
    dataAtualizacao: { type: Date, default: Date.now }
});

disciplinaSchema.pre('save', function(next) {
    this.dataAtualizacao = new Date();
    next();
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
