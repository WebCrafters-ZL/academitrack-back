const bcrypt = require('bcrypt');
const Aluno = require('../models/Aluno');
const Usuario = require('../models/Usuario');

// Cadastrar aluno
const cadastrarAluno = async (req, res) => {
    try {
        const {
            nomeCompleto,
            email,
            senha,
            matricula,
            telefone,
            dataNascimento,
            cpf,
            curso,
            periodo,
            dataMatricula,
        } = req.body;

        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!nomeCompleto || !email || !senha || !matricula || !telefone || !dataNascimento || !cpf || !curso || !periodo || !dataMatricula) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        // Cria um novo usuário com tipo "aluno"
        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = new Usuario({
            email,
            senha: hashedSenha,
            tipoUsuario: 'aluno'  // Definir o tipo de usuário como "aluno"
        });
        await novoUsuario.save();  // Certifique-se de que o usuário foi salvo

        // Cria um novo aluno referenciando o usuário
        const novoAluno = new Aluno({
            nomeCompleto,
            matricula,
            telefone,
            dataNascimento,
            cpf,
            curso,
            periodo,
            dataMatricula,
            usuario_id: novoUsuario._id // Referência ao usuário recém-criado
        });

        await novoAluno.save(); // Salva o aluno

        res.status(201).json(novoAluno); // Retorna o aluno cadastrado
    } catch (error) {
        console.error(error);  // Log para ajudar na depuração
        res.status(500).json({ message: 'Erro ao cadastrar aluno', error });
    }
};

// Listar todos os alunos
const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('usuario_id'); // Popula o campo 'usuario_id' com os dados do usuário
        res.status(200).json(alunos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar alunos', error });
    }
};

// Pesquisar aluno por ID
const pesquisarAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('usuario_id');
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pesquisar aluno', error });
    }
};

// Atualizar aluno
const atualizarAluno = async (req, res) => {
    try {
        const { nomeCompleto, email, senha, matricula, telefone, dataNascimento, cpf, curso, periodo, dataMatricula } = req.body;
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
        if (matricula) aluno.matricula = matricula;
        if (telefone) aluno.telefone = telefone;
        if (dataNascimento) aluno.dataNascimento = dataNascimento;
        if (cpf) aluno.cpf = cpf;
        if (curso) aluno.curso = curso;
        if (periodo) aluno.periodo = periodo;
        if (dataMatricula) aluno.dataMatricula = dataMatricula;
        await aluno.save();

        res.status(200).json(aluno); // Retorna o aluno atualizado
    } catch (error) {
        console.error(error);
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
    atualizarAluno,
    deletarAluno
};
