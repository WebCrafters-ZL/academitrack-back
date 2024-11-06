const express = require('express');
const alunoController = require('../controllers/aluno.controller');
const professorController = require('../controllers/professor.controller');
const cursoController = require('../controllers/curso.controller');
const disciplinaController = require('../controllers/disciplina.controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middleware'); // Importa o middleware
const router = express.Router();

// Rotas para gerenciamento de alunos
router.get('/alunos/:id', isLoggedIn, isAdmin, alunoController.pesquisarAluno);
router.get('/alunos', isLoggedIn, isAdmin, alunoController.listarAlunos);
router.post('/alunos', isLoggedIn, isAdmin, alunoController.cadastrarAluno);
router.put('/alunos/:id', isLoggedIn, isAdmin, alunoController.atualizarAluno);
router.delete('/alunos/:id', isLoggedIn, isAdmin, alunoController.deletarAluno);

// Rotas para gerenciamento de professores
router.get('/professores/:id', isLoggedIn, isAdmin, professorController.pesquisarProfessor);
router.get('/professores', isLoggedIn, isAdmin, professorController.listarProfessores);
router.post('/professores', isLoggedIn, isAdmin, professorController.cadastrarProfessor);
router.put('/professores/:id', isLoggedIn, isAdmin, professorController.atualizarProfessor);
router.delete('/professores/:id', isLoggedIn, isAdmin, professorController.deletarProfessor);

// Rotas para gerenciamento de cursos
router.get('/cursos/:id', isLoggedIn, isAdmin, cursoController.pesquisarCurso);
router.get('/cursos', isLoggedIn, isAdmin, cursoController.listarCursos);
router.post('/cursos', isLoggedIn, isAdmin, cursoController.cadastrarCurso);
router.put('/cursos/:id', isLoggedIn, isAdmin, cursoController.atualizarCurso);
router.delete('/cursos/:id', isLoggedIn, isAdmin, cursoController.excluirCurso);

// Rotas para gerenciamento de disciplinas
router.get('/disciplinas/:id', isLoggedIn, isAdmin, disciplinaController.pesquisarDisciplina);
router.get('/disciplinas', isLoggedIn, isAdmin, disciplinaController.listarDisciplinas);
router.post('/disciplinas', isLoggedIn, isAdmin, disciplinaController.cadastrarDisciplina);
router.put('/disciplinas/:id', isLoggedIn, isAdmin, disciplinaController.atualizarDisciplina);
router.delete('/disciplinas/:id', isLoggedIn, isAdmin, disciplinaController.excluirDisciplina);

module.exports = router;
