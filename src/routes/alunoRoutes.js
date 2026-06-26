// pega o router do express
const express = require('express');

// cria o router
const router = express.Router();

// importa o controller do aluno
const AlunoController = require('../controllers/alunoController');

// cadastrar aluno
router.post('/alunos', AlunoController.criar);

// listar todos os alunos
router.get('/alunos', AlunoController.listarTodos);

// buscar por id
router.get('/alunos/:id', AlunoController.buscarPorId);

// atualizar dados
router.put('/alunos/:id', AlunoController.atualizar);

// deletar aluno
router.delete('/alunos/:id', AlunoController.deletar);

// exporta o router
module.exports = router;
