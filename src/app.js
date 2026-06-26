// importa o express para criar a api
const express = require('express');
// importa o arquivo de rotas
const professorRoutes = require('./routes/professorRoutes');

// inicializa a aplicaçao express
const app = express();

// middleware pra ler json no body das requisiçoes
app.use(express.json());

// middleware simples de log pra ver no console oq ta acontecendo
app.use((req, res, next) => {
  // pega a data e hora atual do sistema
  const dataHora = new Date().toISOString();
  // printa o metodo e a rota chamada no console
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  // continua pro proximo passo
  next();
});

// liga as rotas de professores na aplicacao
app.use(professorRoutes);

// exporta o app configurado pra usar no server.js
module.exports = app;
