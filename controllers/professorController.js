const bcrypt = require('bcrypt');
const Professor = require('../models/Professor');
const Usuario = require('../models/Usuario');

// Cadastrar professor
const cadastrarProfessor = async (req, res) => {
    try {
        const {
            nomeCompleto,
            email,
            senha,
            matricula,
            telefone,
            especialidade,
            formacaoAcademica,
            dataNascimento,
            cpf
        } = req.body;

        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!nomeCompleto || !email || !senha || !matricula || !telefone || !especialidade || !formacaoAcademica || !dataNascimento || !cpf) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        // Cria um novo usuário com tipo "professor"
        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = new Usuario({
            email,
            senha: hashedSenha,
            tipoUsuario: 'professor'  // Definir o tipo de usuário como "professor"
        });
        await novoUsuario.save();  // Certifique-se de que o usuário foi salvo

        // Cria um novo professor referenciando o usuário
        const novoProfessor = new Professor({
            nomeCompleto,
            matricula,
            telefone,
            especialidade,
            formacaoAcademica,
            dataNascimento,
            cpf,
            usuario_id: novoUsuario._id // Referência ao usuário recém-criado
        });

        await novoProfessor.save(); // Salva o professor

        res.status(201).json(novoProfessor); // Retorna o professor cadastrado
    } catch (error) {
        console.error(error);  // Log para ajudar na depuração
        res.status(500).json({ message: 'Erro ao cadastrar professor', error });
    }
};

// Listar todos os professores
const listarProfessores = async (req, res) => {
    try {
        const professores = await Professor.find().populate('usuario_id'); // Popula o campo 'usuario_id' com os dados do usuário
        res.status(200).json(professores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar professores', error });
    }
};

// Pesquisar professor por ID
const pesquisarProfessor = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id).populate('usuario_id');
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pesquisar professor', error });
    }
};

// Atualizar professor
const atualizarProfessor = async (req, res) => {
    try {
        const { nomeCompleto, email, senha, matricula, telefone, especialidade, formacaoAcademica, dataNascimento, cpf } = req.body;
        const professor = await Professor.findById(req.params.id);

        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        // Atualiza os dados do usuário
        const usuario = await Usuario.findById(professor.usuario_id);
        if (email) usuario.email = email;
        if (senha) usuario.senha = await bcrypt.hash(senha, 10);
        await usuario.save();

        // Atualiza os dados do professor
        if (nomeCompleto) professor.nomeCompleto = nomeCompleto;
        if (matricula) professor.matricula = matricula;
        if (telefone) professor.telefone = telefone;
        if (especialidade) professor.especialidade = especialidade;
        if (formacaoAcademica) professor.formacaoAcademica = formacaoAcademica;
        if (dataNascimento) professor.dataNascimento = dataNascimento;
        if (cpf) professor.cpf = cpf;
        await professor.save();

        res.status(200).json(professor); // Retorna o professor atualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar professor', error });
    }
};

// Deletar professor
const deletarProfessor = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);

        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        // Deleta o usuário associado
        await Usuario.findByIdAndDelete(professor.usuario_id);

        // Deleta o professor
        await Professor.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Professor deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar professor', error });
    }
};

module.exports = {
    cadastrarProfessor,
    listarProfessores,
    pesquisarProfessor,
    atualizarProfessor,
    deletarProfessor
};
