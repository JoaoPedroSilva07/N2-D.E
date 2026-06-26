// importa o mysql2 puro pra fazer a conexao inicial
const mysql = require('mysql2/promise');

async function criarBanco() {
  try {
    // conecta no mysql com as credenciais do escola_user
    const conexao = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'escola_user',
      password: process.env.DB_PASSWORD || 'escola_pass',
      database: process.env.DB_NAME || 'escola'
    });

    console.log('Conectado ao banco "escola" com sucesso.');

    // sql pra criar a tabela de professores
    const tabelaProfessoresSql = `
      CREATE TABLE IF NOT EXISTS professores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        disciplina VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        salario DECIMAL(10,2) NOT NULL
      )
    `;
    await conexao.query(tabelaProfessoresSql);
    console.log('Tabela "professores" verificada/criada.');

    // sql pra criar a tabela de disciplinas relacionada a professores
    const tabelaDisciplinasSql = `
      CREATE TABLE IF NOT EXISTS disciplinas (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        carga_horaria INT NOT NULL,
        professor_id INT,
        FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
      )
    `;
    await conexao.query(tabelaDisciplinasSql);
    console.log('Tabela "disciplinas" verificada/criada.');

    // sql pra criar a tabela de cursos
    const tabelaCursosSql = `
      CREATE TABLE IF NOT EXISTS cursos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        duracao_semestres INT NOT NULL
      )
    `;
    await conexao.query(tabelaCursosSql);
    console.log('Tabela "cursos" verificada/criada.');

    // sql pra criar a tabela de alunos relacionada a cursos
    const tabelaAlunosSql = `
      CREATE TABLE IF NOT EXISTS alunos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        curso_id INT,
        FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
      )
    `;
    await conexao.query(tabelaAlunosSql);
    console.log('Tabela "alunos" verificada/criada.');

    // fecha a conexao
    await conexao.end();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar setup do banco:', error.message);
    process.exit(1);
  }
}

criarBanco();
