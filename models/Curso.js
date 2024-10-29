const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    cargaHoraria: { type: Number, required: true },
    categoria: { type: String, required: true },
    status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
    timestamps: {
        createdAt: 'criadoEm',
        updatedAt: 'atualizadoEm'
    }
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
