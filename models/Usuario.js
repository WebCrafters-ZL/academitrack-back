const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor, insira um email válido.']
    },
    senha: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    tipoUsuario: {
        type: String,
        enum: ['administrador', 'professor', 'aluno'],
        required: true
    },
    resetSenhaToken: {
        type: String
    },
    resetSenhaExpira: {
        type: Date
    },
    senhaRedefinida: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: {
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm'
        }
    });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
