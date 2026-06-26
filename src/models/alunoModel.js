// pega a conexao com o banco escola
const conexao = require('../database/conexao');

// model para gerenciar alunos no mysql
class AlunoModel {

  // cadastra um novo aluno
  static async criar(nome, email, curso_id) {
    // query sql usando placeholders
    const sql = 'INSERT INTO alunos (nome, email, curso_id) VALUES (?, ?, ?)';
    // roda o insert com os parametros
    const [resultado] = await conexao.execute(sql, [nome, email, curso_id || null]);
    // retorna resultado do insert
    return resultado;
  }

  // lista todos os alunos cadastrados
  static async listarTodos() {
    // faz left join pra trazer o nome do curso junto com o aluno
    const sql = `
      SELECT a.*, c.nome AS curso_nome 
      FROM alunos a 
      LEFT JOIN cursos c ON a.curso_id = c.id
    `;
    // roda a query
    const [linhas] = await conexao.execute(sql);
    // retorna a lista
    return linhas;
  }

  // busca aluno especifico por id
  static async buscarPorId(id) {
    // traz o nome do curso pelo left join filtrando pelo id do aluno
    const sql = `
      SELECT a.*, c.nome AS curso_nome 
      FROM alunos a 
      LEFT JOIN cursos c ON a.curso_id = c.id 
      WHERE a.id = ?
    `;
    // roda a query
    const [linhas] = await conexao.execute(sql, [id]);
    // retorna a primeira linha
    return linhas[0];
  }

  // atualiza dados de um aluno
  static async atualizar(id, nome, email, curso_id) {
    // query de update
    const sql = 'UPDATE alunos SET nome = ?, email = ?, curso_id = ? WHERE id = ?';
    // executa o update
    const [resultado] = await conexao.execute(sql, [nome, email, curso_id || null, id]);
    // retorna o resultado do banco
    return resultado;
  }

  // deleta um aluno por id
  static async deletar(id) {
    // query de delete
    const sql = 'DELETE FROM alunos WHERE id = ?';
    // executa
    const [resultado] = await conexao.execute(sql, [id]);
    // retorna resultado da query
    return resultado;
  }
}

// exporta o model pros controllers
module.exports = AlunoModel;
