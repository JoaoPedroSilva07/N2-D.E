// pega a conexao configurada com o mysql
const conexao = require('../database/conexao');

// model de professores para as funçoes do banco
class ProfessorModel {

  // cadastra um novo professor
  static async criar(nome, disciplina, email, salario) {
    // query sql usando placeholders pra evitar sql injection
    const sql = 'INSERT INTO professores (nome, disciplina, email, salario) VALUES (?, ?, ?, ?)';
    // roda a query com os parametros recebidos
    const [resultado] = await conexao.execute(sql, [nome, disciplina, email, salario]);
    // retorna o resultado da query
    return resultado;
  }

  // busca todos os professores do banco
  static async listarTodos() {
    // sql pra pegar tudo
    const sql = 'SELECT * FROM professores';
    // executa a query e pega os resultados
    const [linhas] = await conexao.execute(sql);
    // retorna a lista com todos
    return linhas;
  }

  // busca professor especifico por id
  static async buscarPorId(id) {
    // query com where filtrando pelo id
    const sql = 'SELECT * FROM professores WHERE id = ?';
    // executa pasando o id
    const [linhas] = await conexao.execute(sql, [id]);
    // retorna a primeira linha encontrada
    return linhas[0];
  }

  // atualiza dados do professor
  static async atualizar(id, nome, disciplina, email, salario) {
    // query de update pro id correspondente
    const sql = 'UPDATE professores SET nome = ?, disciplina = ?, email = ?, salario = ? WHERE id = ?';
    // executa passando os novos dados e o id
    const [resultado] = await conexao.execute(sql, [nome, disciplina, email, salario, id]);
    // retorna o resultado do update
    return resultado;
  }

  // deleta um professor por id
  static async deletar(id) {
    // query de delete
    const sql = 'DELETE FROM professores WHERE id = ?';
    // executa passando o id
    const [resultado] = await conexao.execute(sql, [id]);
    // retorna o resultado do banco
    return resultado;
  }
}

// exporta o model pros controllers usarem
module.exports = ProfessorModel;
