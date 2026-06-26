// Importa o módulo express para criar as rotas do sistema
const express = require('express');

// Cria uma instância do roteador do Express para registrar as rotas de professores
const router = express.Router();

// Importa o controlador ProfessorController para associar às rotas correspondentes
const ProfessorController = require('../controllers/professorController');

// Define a rota POST para cadastrar um professor associada ao método criar do controlador
router.post('/professores', ProfessorController.criar);

// Define a rota GET para listar todos os professores associada ao método listarTodos do controlador
router.get('/professores', ProfessorController.listarTodos);

// Define a rota GET com parâmetro id para buscar um professor pelo ID, associada ao método buscarPorId
router.get('/professores/:id', ProfessorController.buscarPorId);

// Define a rota PUT com parâmetro id para atualizar as informações de um professor, associada ao método atualizar
router.put('/professores/:id', ProfessorController.atualizar);

// Define a rota DELETE com parâmetro id para deletar um professor, associada ao método deletar do controlador
router.delete('/professores/:id', ProfessorController.deletar);

// Exporta o roteador configurado para que seja montado na aplicação principal (app.js)
module.exports = router;
