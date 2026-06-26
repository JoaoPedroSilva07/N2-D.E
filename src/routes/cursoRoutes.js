// puxa o router do express
const express = require('express');

// cria o router
const router = express.Router();

// importa o controller do curso
const CursoController = require('../controllers/cursoController');

// cadastrar curso
router.post('/cursos', CursoController.criar);

// listar todos os cursos
router.get('/cursos', CursoController.listarTodos);

// buscar por id
router.get('/cursos/:id', CursoController.buscarPorId);

// atualizar dados
router.put('/cursos/:id', CursoController.atualizar);

// deletar curso
router.delete('/cursos/:id', CursoController.deletar);

// exporta o router
module.exports = router;
