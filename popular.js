// importa a conexao ja configurada
const conexao = require('./src/database/conexao');

async function popular() {
  try {
    // queries de insert para teste
    const sql = `
      INSERT INTO professores (nome, disciplina, email, salario) VALUES 
      ('Alan Turing', 'Computação', 'alan@escola.com', 7500.00),
      ('Grace Hopper', 'Sistemas Operacionais', 'grace@escola.com', 8000.00),
      ('Ada Lovelace', 'Algoritmos', 'ada@escola.com', 8500.00)
    `;
    
    // roda o insert no banco
    await conexao.execute(sql);
    console.log('Banco de dados populado com professores de teste!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular:', error.message);
    process.exit(1);
  }
}

popular();
