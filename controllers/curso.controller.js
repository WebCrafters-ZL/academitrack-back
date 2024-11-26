const Curso = require("../models/curso.model");

const cadastrarCurso = async (req, res) => {
  try {
    const { nome, codigo, descricao, cargaHoraria, categoria } = req.body;
    if (!nome || !descricao || !cargaHoraria || !categoria) {
      return res
        .status(400)
        .json({ message: "Parâmetros obrigatórios faltando" });
    }
    const novoCurso = new Curso({
      nome,
      codigo,
      descricao,
      cargaHoraria,
      categoria,
    });
    await novoCurso.save();
    return res.status(201).json(novoCurso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao cadastrar curso", error });
  }
};

const listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    return res.status(200).json(cursos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar cursos", error });
  }
};

const pesquisarCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }
    return res.status(200).json(curso);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao pesquisar curso", error });
  }
};

const atualizarCurso = async (req, res) => {
  try {
    const { nome, codigo, descricao, cargaHoraria, categoria } = req.body;
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }
    if (nome) curso.nome = nome;
    if (codigo) curso.codigo = codigo;
    if (descricao) curso.descricao = descricao;
    if (cargaHoraria) curso.cargaHoraria = cargaHoraria;
    if (categoria) curso.categoria = categoria;
    await curso.save();
    return res.status(200).json(curso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar curso", error });
  }
};

const excluirCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }

    // A exclusão deve ser feita através do modelo, não do documento
    await Curso.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Curso excluído com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir curso", error });
  }
};

module.exports = {
  cadastrarCurso,
  listarCursos,
  pesquisarCurso,
  atualizarCurso,
  excluirCurso,
};
