// Importa o módulo mysql2 com suporte a Promises para utilizar async/await
const mysql = require('mysql2/promise');

// Cria o pool de conexões com o banco de dados utilizando as credenciais definidas
const conexao = mysql.createPool({
  // Define o endereço do servidor do banco de dados (padrão é localhost)
  host: process.env.DB_HOST || 'localhost',
  // Define o usuário do banco de dados configurado no script SQL
  user: process.env.DB_USER || 'escola_user',
  // Define a senha do banco de dados configurada no script SQL
  password: process.env.DB_PASSWORD || 'escola_pass',
  // Define o nome do banco de dados obrigatório 'escola'
  database: process.env.DB_NAME || 'escola',
  // Habilita a espera por conexões disponíveis na pool
  waitForConnections: true,
  // Define o limite máximo de conexões simultâneas na pool
  connectionLimit: 10,
  // Define o limite máximo de requisições na fila de espera por conexões
  queueLimit: 0
});

// Exporta o pool de conexões para que possa ser utilizado pelos modelos do sistema
module.exports = conexao;
