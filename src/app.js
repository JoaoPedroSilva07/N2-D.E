// importa o express para criar a api
const express = require('express');
// importa o arquivo de rotas
const professorRoutes = require('./routes/professorRoutes');
// importa rotas das disciplinas
const disciplinaRoutes = require('./routes/disciplinaRoutes');
// rotas de cursos
const cursoRoutes = require('./routes/cursoRoutes');
// rotas de alunos
const alunoRoutes = require('./routes/alunoRoutes');

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
// liga as rotas de disciplinas na aplicacao
app.use(disciplinaRoutes);
// liga rotas de cursos
app.use(cursoRoutes);
// liga rotas de alunos
app.use(alunoRoutes);

// exporta o app configurado pra usar no server.js
module.exports = app;
