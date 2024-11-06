const Turma = require('../models/turma.model');

exports.criarTurma = async (req, res) => {
  try {
    const novaTurma = new Turma(req.body);
    const turmaSalva = await novaTurma.save();
    res.status(201).json(turmaSalva);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
};

exports.listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate('disciplina', 'nome')
      .populate('professor', 'nome')
      .populate('alunos', 'nome');
    res.json(turmas);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
};

exports.obterTurma = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id)
      .populate('disciplina', 'nome')
      .populate('professor', 'nome')
      .populate('alunos', 'nome');
    if (!turma) {
      return res.status(404).json({ mensagem: 'Turma não encontrada' });
    }
    res.json(turma);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
};

exports.atualizarTurma = async (req, res) => {
  try {
    const turmaAtualizada = await Turma.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!turmaAtualizada) {
      return res.status(404).json({ mensagem: 'Turma não encontrada' });
    }
    res.json(turmaAtualizada);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
};

exports.excluirTurma = async (req, res) => {
  try {
    const turmaExcluida = await Turma.findByIdAndDelete(req.params.id);
    if (!turmaExcluida) {
      return res.status(404).json({ mensagem: 'Turma não encontrada' });
    }
    res.json({ mensagem: 'Turma excluída com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
};

exports.adicionarAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ mensagem: 'Turma não encontrada' });
    }
    if (turma.alunos.length >= turma.capacidadeMaxima) {
      return res.status(400).json({ mensagem: 'A turma já atingiu a capacidade máxima' });
    }
    turma.alunos.push(req.body.alunoId);
    await turma.save();
    res.json(turma);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
};

exports.removerAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ mensagem: 'Turma não encontrada' });
    }
    turma.alunos = turma.alunos.filter(aluno => aluno.toString() !== req.body.alunoId);
    await turma.save();
    res.json(turma);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
};
