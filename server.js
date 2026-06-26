// Importa o aplicativo express configurado a partir da pasta src
const app = require('./src/app');

// Define a porta em que o servidor web irá rodar, utilizando variável de ambiente ou porta padrão 3000
const PORT = process.env.PORT || 3000;

// Inicia o servidor HTTP para escutar requisições na porta definida
app.listen(PORT, () => {
  // Exibe no console uma mensagem de sucesso indicando que o servidor está pronto
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
