// puxa o express pra gerenciar as rotas
const express = require('express');

// cria o router do express
const router = express.Router();

// importa o controller de disciplinas
const DisciplinaController = require('../controllers/disciplinaController');

// rota pra cadastrar uma nova disciplina
router.post('/disciplinas', DisciplinaController.criar);

// rota pra listar todas
router.get('/disciplinas', DisciplinaController.listarTodos);

// rota pra buscar uma unica disciplina por id
router.get('/disciplinas/:id', DisciplinaController.buscarPorId);

// rota pra atualizar dados da disciplina
router.put('/disciplinas/:id', DisciplinaController.atualizar);

// rota pra deletar disciplina
router.delete('/disciplinas/:id', DisciplinaController.deletar);

// exporta o router pra usar no app.js
module.exports = router;
