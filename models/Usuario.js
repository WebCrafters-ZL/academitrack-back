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
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date,
        default: Date.now
    }
});

// Middleware para atualizar o campo dataAtualizacao
usuarioSchema.pre('save', function (next) {
    this.dataAtualizacao = new Date();
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
