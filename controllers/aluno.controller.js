const bcrypt = require('bcrypt');
const obterUsuarioIdDoToken = require('../helpers/obterUsuarioIdDoToken.helper');
const Aluno = require('../models/aluno.model');
const Usuario = require('../models/usuario.model');

const cadastrarAluno = async (req, res) => {
    try {
        const {
            nomeCompleto,
            email,
            senha,
            cpf,
            dataNascimento,
            telefone,
            endereco,
            matricula
        } = req.body;

        if (!nomeCompleto || !email || !senha || !cpf || !dataNascimento || !telefone || !matricula) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }

        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = new Usuario({
            email,
            senha: hashedSenha,
            tipoUsuario: 'aluno'
        });
        await novoUsuario.save();

        try {
            const novoAluno = new Aluno({
                nomeCompleto,
                cpf,
                dataNascimento,
                telefone,
                endereco,
                matricula,
                usuario_id: novoUsuario._id
            });
            await novoAluno.save();

            // Retorna uma mensagem de sucesso junto com o código 201
            res.status(201).json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
        } catch (error) {
            await Usuario.findByIdAndDelete(novoUsuario._id);
            console.error("Erro ao salvar Aluno, rollback do Usuario:", error);
            res.status(500).json({ message: "Erro ao cadastrar aluno", error });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar aluno", error });
    }
};

// Listar todos os alunos
const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('usuario_id', 'email'); // Popula apenas o campo 'email'
        
        const alunosComEmail = alunos.map(aluno => ({
            _id: aluno._id,
            nomeCompleto: aluno.nomeCompleto,
            cpf: aluno.cpf,
            dataNascimento: aluno.dataNascimento,
            telefone: aluno.telefone,
            endereco: aluno.endereco,
            matricula: aluno.matricula,
            email: aluno.usuario_id.email, // Inclui o email do usuário
            status: aluno.status
        }));
        res.status(200).json(alunosComEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar alunos', error });
    }
};

// Pesquisar aluno por ID
const pesquisarAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('usuario_id', 'email'); // Popula apenas o campo 'email'
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        const alunoComEmail = {
            _id: aluno._id,
            nomeCompleto: aluno.nomeCompleto,
            cpf: aluno.cpf,
            dataNascimento: aluno.dataNascimento,
            telefone: aluno.telefone,
            endereco: aluno.endereco,
            matricula: aluno.matricula,
            email: aluno.usuario_id.email, // Inclui o email do usuário
            status: aluno.status
        };
        res.status(200).json(alunoComEmail);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pesquisar aluno', error });
    }
};

// Pesquisar aluno por ID
const obterPerfilAluno = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = obterUsuarioIdDoToken(token); // Obtém o usuarioId do token

        if (!usuarioId) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const aluno = await Aluno.findOne({ usuario_id: usuarioId }).populate('usuario_id', 'email'); // Usa o usuarioId para buscar o aluno
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        const alunoComEmail = {
            _id: aluno._id,
            nomeCompleto: aluno.nomeCompleto,
            matricula: aluno.matricula,
            email: aluno.usuario_id.email,
            cpf: aluno.cpf,
            status: aluno.status
        };
        res.status(200).json(alunoComEmail);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pesquisar aluno', error });
    }
};

// Atualizar aluno
const atualizarAluno = async (req, res) => {
    try {
        const { nomeCompleto, email, senha, cpf, dataNascimento, telefone, endereco, matricula } = req.body;
        const aluno = await Aluno.findById(req.params.id);

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        // Atualiza os dados do usuário
        const usuario = await Usuario.findById(aluno.usuario_id);
        if (email) usuario.email = email;
        if (senha) usuario.senha = await bcrypt.hash(senha, 10);
        await usuario.save();

        // Atualiza os dados do aluno
        if (nomeCompleto) aluno.nomeCompleto = nomeCompleto;
        if (cpf) aluno.cpf = cpf;
        if (dataNascimento) aluno.dataNascimento = dataNascimento;
        if (telefone) aluno.telefone = telefone;
        if (endereco) aluno.endereco = endereco;
        if (matricula) aluno.matricula = matricula;
        await aluno.save();

        res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar aluno', error });
    }
};

const atualizarPerfilAluno = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho
        const usuarioId = obterUsuarioIdDoToken(token); // Obtém o usuarioId do token

        if (!usuarioId) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const { nomeCompleto, email, senha, cpf } = req.body;
        const aluno = await Aluno.findOne({ usuario_id: usuarioId }); // Usa o usuarioId para buscar o aluno

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        // Atualiza os dados do usuário
        const usuario = await Usuario.findById(aluno.usuario_id);
        if (email) usuario.email = email;
        if (senha) usuario.senha = await bcrypt.hash(senha, 10);
        await usuario.save();

        // Atualiza os dados do aluno
        if (nomeCompleto) aluno.nomeCompleto = nomeCompleto;
        if (cpf) aluno.cpf = cpf;
        await aluno.save();

        res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error });
    }
};

// Deletar aluno
const deletarAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        // Deleta o usuário associado
        await Usuario.findByIdAndDelete(aluno.usuario_id);

        // Deleta o aluno
        await Aluno.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar aluno', error });
    }
};

module.exports = {
    cadastrarAluno,
    listarAlunos,
    pesquisarAluno,
    obterPerfilAluno,
    atualizarAluno,
    atualizarPerfilAluno,
    deletarAluno
};
