// pega o app express pronto la da pasta src
const app = require('./src/app');

// porta do servidor, puxa da env ou usa a padrao 3000
const PORT = process.env.PORT || 3000;

// inicia o servidor web na porta especificada
app.listen(PORT, () => {
  // printa no console indicando q ta rodando certinho
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
