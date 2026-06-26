// importa o mysql2 com suporte a promises pra usar async/await
const mysql = require('mysql2/promise');

// cria a pool de conexao com as credenciais do banco
const conexao = mysql.createPool({
  // host do banco de dados (local)
  host: process.env.DB_HOST || 'localhost',
  // usuario criado no script sql
  user: process.env.DB_USER || 'escola_user',
  // senha do usuario escola_user
  password: process.env.DB_PASSWORD || 'escola_pass',
  // nome do banco de dados (tem q ser escola)
  database: process.env.DB_NAME || 'escola',
  // se todas as conexoes tiverem ocupadas, ele espera
  waitForConnections: true,
  // limite maximo de conexoes simultaneas
  connectionLimit: 10,
  // sem limite de fila
  queueLimit: 0
});

// exporta o pool pra ser usado nos models
module.exports = conexao;
