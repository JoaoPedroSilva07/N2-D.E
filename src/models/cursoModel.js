// conexao com o mysql
const conexao = require('../database/conexao');

// model de cursos para as operacoes de banco
class CursoModel {

  // cria um novo curso
  static async criar(nome, duracao_semestres) {
    // query sql usando placeholders
    const sql = 'INSERT INTO cursos (nome, duracao_semestres) VALUES (?, ?)';
    // roda a query
    const [resultado] = await conexao.execute(sql, [nome, duracao_semestres]);
    // retorna resultado
    return resultado;
  }

  // lista todos os cursos do banco
  static async listarTodos() {
    // query de select simples
    const sql = 'SELECT * FROM cursos';
    // executa e pega os registros
    const [linhas] = await conexao.execute(sql);
    // retorna a lista
    return linhas;
  }

  // busca curso especifico por id
  static async buscarPorId(id) {
    // query filtrando por id
    const sql = 'SELECT * FROM cursos WHERE id = ?';
    // roda a query com o parametro id
    const [linhas] = await conexao.execute(sql, [id]);
    // retorna o primeiro registro encontrado
    return linhas[0];
  }

  // atualiza dados do curso
  static async atualizar(id, nome, duracao_semestres) {
    // query de update
    const sql = 'UPDATE cursos SET nome = ?, duracao_semestres = ? WHERE id = ?';
    // executa o update
    const [resultado] = await conexao.execute(sql, [nome, duracao_semestres, id]);
    // retorna o resultado do banco
    return resultado;
  }

  // deleta um curso por id
  static async deletar(id) {
    // query de delete
    const sql = 'DELETE FROM cursos WHERE id = ?';
    // executa a exclusao
    const [resultado] = await conexao.execute(sql, [id]);
    // retorna resultado da query
    return resultado;
  }
}

// exporta o model pros controllers
module.exports = CursoModel;
