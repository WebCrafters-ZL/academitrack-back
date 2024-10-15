const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor, insira um email válido.']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
