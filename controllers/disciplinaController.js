const Disciplina = require('../models/Disciplina');
const Curso = require('../models/Curso');

const cadastrarDisciplina = async (req, res) => {
    try {
        const { nome, descricao, cargaHoraria, curso_id } = req.body;
        if (!nome || !descricao || !cargaHoraria || !curso_id) {
            return res.status(400).json({ message: 'Parâmetros obrigatórios faltando' });
        }
        const curso = await Curso.findById(curso_id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso não encontrado' });
        }
        const novaDisciplina = new Disciplina({ nome, descricao, cargaHoraria, curso_id });
        await novaDisciplina.save();
        return res.status(201).json(novaDisciplina);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao cadastrar disciplina', error });
    }
};

const listarDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.find().populate('curso_id');
        return res.status(200).json(disciplinas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao listar disciplinas', error });
    }
};

const pesquisarDisciplina = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id).populate('curso_id');
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        return res.status(200).json(disciplina);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao pesquisar disciplina', error });
    }
};

const atualizarDisciplina = async (req, res) => {
    try {
        const { nome, descricao, cargaHoraria, curso_id } = req.body;
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        if (nome) disciplina.nome = nome;
        if (descricao) disciplina.descricao = descricao;
        if (cargaHoraria) disciplina.cargaHoraria = cargaHoraria;
        if (curso_id) disciplina.curso_id = curso_id;
        await disciplina.save();
        return res.status(200).json(disciplina);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
    }
};

const excluirDisciplina = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        await disciplina.remove();
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir disciplina', error });
    }
};

module.exports = {
    cadastrarDisciplina,
    listarDisciplinas,
    pesquisarDisciplina,
    atualizarDisciplina,
    excluirDisciplina
};