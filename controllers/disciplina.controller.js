const Disciplina = require('../models/disciplina.model');
const Curso = require('../models/curso.model');

exports.cadastrarDisciplina = async (req, res) => {
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

exports.listarDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.find().populate('curso_id', 'nome');
        const disciplinasComCurso = disciplinas.map(disciplina => ({
            _id: disciplina._id,
            nome: disciplina.nome,
            descricao: disciplina.descricao,
            cargaHoraria: disciplina.cargaHoraria,
            status: disciplina.status,
            curso: disciplina.curso_id.nome
        }));
        return res.status(200).json(disciplinasComCurso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao listar disciplinas', error });
    }
};

exports.pesquisarDisciplina = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id).populate('curso_id', 'nome');
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        const disciplinaComCurso = {
            _id: disciplina._id,
            nome: disciplina.nome,
            descricao: disciplina.descricao,
            cargaHoraria: disciplina.cargaHoraria,
            status: disciplina.status,
            curso: disciplina.curso_id.nome
        };
        return res.status(200).json(disciplinaComCurso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao pesquisar disciplina', error });
    }
};

exports.atualizarDisciplina = async (req, res) => {
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

exports.excluirDisciplina = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        await Disciplina.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Disciplina excluído com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir disciplina', error });
    }
};
