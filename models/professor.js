const mongoose = require('mongoose');
const Usuario = require('./usuario');

const professorSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  departamento: { type: String, required: true }
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;