// importa o mysql2 puro pra fazer a conexao inicial
const mysql = require('mysql2/promise');

async function criarBanco() {
  try {
    // conecta no mysql sem escolher database de cara
    // ajuste usuario/senha aqui caso seu mysql local precise
    const conexao = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: 'root',
      password: ''
    });

    // cria o banco se nao existir
    await conexao.query('CREATE DATABASE IF NOT EXISTS escola');
    console.log('Banco "escola" verificado/criado.');

    // escolhe o banco escola
    await conexao.query('USE escola');

    // sql pra criar a tabela obrigatoria
    const tabelaSql = `
      CREATE TABLE IF NOT EXISTS professores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        disciplina VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        salario DECIMAL(10,2) NOT NULL
      )
    `;
    
    // roda a criacao da tabela
    await conexao.query(tabelaSql);
    console.log('Tabela "professores" verificada/criada.');

    // fecha a conexao
    await conexao.end();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar setup do banco:', error.message);
    process.exit(1);
  }
}

criarBanco();
