const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    cargaHoraria: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'], default: 'ativo'
    },
    curso_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
},
    {
        timestamps: {
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm'
        }
    });

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
