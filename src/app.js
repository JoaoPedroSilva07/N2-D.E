// Importa o módulo Express para criação da API
const express = require('express');
// Importa o roteador com os endpoints de professores
const professorRoutes = require('./routes/professorRoutes');

// Inicializa a instância da aplicação Express
const app = express();

// Configura o middleware para processar requisições em formato JSON
app.use(express.json());

// Middleware customizado para logar informações de cada requisição no console
app.use((req, res, next) => {
  // Obtém a data e hora atual formatada em string do sistema
  const dataHora = new Date().toISOString();
  // Exibe no console o timestamp, o método HTTP e a rota solicitada pelo cliente
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  // Passa o controle para o próximo middleware ou rota da aplicação
  next();
});

// Registra as rotas importadas na aplicação
app.use(professorRoutes);

// Exporta a instância do aplicativo configurado para ser iniciada pelo servidor
module.exports = app;
