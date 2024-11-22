const Turma = require('../models/turma.model');

const criarTurma = async (req, res) => {
  try {
    const {
      disciplina_id,
      professor_id,
      alunos_id,
      ano,
      semestre
    } = req.body;

    // Validação dos campos obrigatórios
    if (!disciplina_id || !professor_id || !ano || !semestre || !alunos_id) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const novaTurma = new Turma({
      disciplina_id,
      professor_id,
      alunos_id,
      ano: Number(ano),      // Converte para número
      semestre: Number(semestre)  // Converte para número
    });

    await novaTurma.save();
    res.status(201).json({ message: 'Turma criada com sucesso', turma: novaTurma });
  } catch (error) {
    console.error(error); // Adicione para debugar
    res.status(500).json({ message: error.message });
  }
};


const listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate('disciplina_id', 'nome')
      .populate('professor_id', 'nomeCompleto')
      .populate('alunos_id', 'nomeCompleto');
    const turmasDetalhadas = turmas.map(turma => { 
      return {
        id: turma._id,
        disciplina: turma.disciplina.nome,
        professor: turma.professor.nomeCompleto,
        alunos: turma.alunos.map(alunos => alunos.nomeCompleto),
        ano: turma.ano,
        semestre: turma.semestre
      };
    });
    res.status(200).json(turmasDetalhadas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar turmas', error });
  }
};

const obterTurma = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id)
    .populate('disciplina_id', 'nome')
    .populate('professor_id', 'nomeCompleto')
    .populate('alunos_id', 'nomeCompleto');
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    const turmaDetalhada = turma.map(turma => { 
      return {
        id: turma._id,
        disciplina: turma.disciplina.nome,
        professor: turma.professor.nomeCompleto,
        alunos: turma.alunos.map(alunos => alunos.nomeCompleto),
        ano: turma.ano,
        semestre: turma.semestre
      };
    });
    res.json(turmaDetalhada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao pesquisar turma', error });
  }
};

const atualizarTurma = async (req, res) => {
  try {
    const {
      disciplina,
      professor,
      alunos,
      ano,
      semestre
    } = req.body;
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    if (disciplina) turma.disciplina = disciplina;
    if (professor) turma.professor = professor;
    if (alunos) turma.alunos = alunos;
    if (ano) turma.ano = ano;
    if (semestre) turma.semestre = semestre;
    await turma.save();

    res.status(200).json({ message: 'Turma atualizada com sucesso', turma });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar turma', error });
  }
};

const excluirTurma = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    await Turma.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Turma deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar turma', error });
  }
};

const adicionarAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    if (turma.alunos.length >= turma.capacidadeMaxima) {
      return res.status(400).json({ message: 'A turma já atingiu a capacidade máxima' });
    }
    turma.alunos.push(req.body.alunoId);
    await turma.save();
    res.status(200).json({ message: 'Aluno adicionado com sucesso', turma });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar aluno', error });
  }
};

const removerAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    turma.alunos = turma.alunos.filter(aluno => aluno.toString() !== req.body.alunoId);
    await turma.save();
    res.status(200).json({ message: 'Aluno removido com sucesso', turma });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar aluno', error });
  }
};

module.exports = {
  criarTurma,
  listarTurmas,
  obterTurma,
  atualizarTurma,
  excluirTurma,
  adicionarAluno,
  removerAluno
};