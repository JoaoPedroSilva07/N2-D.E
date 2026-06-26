// importa a conexao ja configurada
const conexao = require('./src/database/conexao');

async function popular() {
  try {
    // limpa dados antigos pra nao dar erro de duplicado ou chave se rodar multiplas vezes
    // (deleta os filhos primeiro por causa das foreign keys)
    await conexao.execute('DELETE FROM alunos');
    await conexao.execute('DELETE FROM disciplinas');
    await conexao.execute('DELETE FROM cursos');
    await conexao.execute('DELETE FROM professores');

    // reseta os contadores de auto-incremento de todos
    await conexao.execute('ALTER TABLE professores AUTO_INCREMENT = 1');
    await conexao.execute('ALTER TABLE disciplinas AUTO_INCREMENT = 1');
    await conexao.execute('ALTER TABLE cursos AUTO_INCREMENT = 1');
    await conexao.execute('ALTER TABLE alunos AUTO_INCREMENT = 1');

    // queries de insert para teste de professores
    const insertProfessoresSql = `
      INSERT INTO professores (nome, disciplina, email, salario) VALUES 
      ('Alan Turing', 'Computação', 'alan@escola.com', 7500.00),
      ('Grace Hopper', 'Sistemas Operacionais', 'grace@escola.com', 8000.00),
      ('Ada Lovelace', 'Algoritmos', 'ada@escola.com', 8500.00)
    `;
    const [profResult] = await conexao.execute(insertProfessoresSql);
    const profId = profResult.insertId;
    console.log('Banco de dados populado com professores de teste!');

    // queries de insert para disciplinas vinculadas aos professores
    const insertDisciplinasSql = `
      INSERT INTO disciplinas (nome, carga_horaria, professor_id) VALUES 
      ('Algoritmos e Estrutura de Dados', 80, ${profId + 2}), -- Ada Lovelace
      ('Introdução a Compiladores', 60, ${profId + 1}),       -- Grace Hopper
      ('Lógica de Computação', 40, ${profId})                -- Alan Turing
    `;
    await conexao.execute(insertDisciplinasSql);
    console.log('Banco de dados populado com disciplinas de teste!');

    // queries de insert para cursos
    const insertCursosSql = `
      INSERT INTO cursos (nome, duracao_semestres) VALUES 
      ('Engenharia de Computação', 10),
      ('Ciência da Computação', 8),
      ('Sistemas de Informação', 8)
    `;
    const [cursosResult] = await conexao.execute(insertCursosSql);
    const cursoId = cursosResult.insertId;
    console.log('Banco de dados populado com cursos de teste!');

    // queries de insert para alunos vinculados aos cursos
    const insertAlunosSql = `
      INSERT INTO alunos (nome, email, curso_id) VALUES 
      ('João Silva', 'joao.silva@email.com', ${cursoId}),       -- Engenharia de Computação
      ('Maria Oliveira', 'maria.oliveira@email.com', ${cursoId + 1}), -- Ciência da Computação
      ('Carlos Souza', 'carlos.souza@email.com', ${cursoId + 2})     -- Sistemas de Informação
    `;
    await conexao.execute(insertAlunosSql);
    console.log('Banco de dados populado com alunos de teste!');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular:', error.message);
    process.exit(1);
  }
}

popular();
