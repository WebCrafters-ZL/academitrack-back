const mongoose = require('mongoose');
const Usuario = require('./usuario');

const administradorSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  cargo: { type: String, required: true }
});

const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;