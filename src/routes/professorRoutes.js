// puxa o express pra gerenciar as rotas
const express = require('express');

// cria o router do express
const router = express.Router();

// importa o controller correspondente
const ProfessorController = require('../controllers/professorController');

// rota pra cadastrar professor
router.post('/professores', ProfessorController.criar);

// rota pra listar todos
router.get('/professores', ProfessorController.listarTodos);

// rota pra buscar por id
router.get('/professores/:id', ProfessorController.buscarPorId);

// rota pra atualizar dados do professor
router.put('/professores/:id', ProfessorController.atualizar);

// rota pra deletar professor
router.delete('/professores/:id', ProfessorController.deletar);

// exporta o router pra usar no app.js
module.exports = router;
