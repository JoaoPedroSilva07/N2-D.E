// pega a conexao com o banco escola
const conexao = require('../database/conexao');

// model para manipular as disciplinas no banco
class DisciplinaModel {

  // cadastra uma nova disciplina
  static async criar(nome, carga_horaria, professor_id) {
    // query de insert padrao com placeholders
    const sql = 'INSERT INTO disciplinas (nome, carga_horaria, professor_id) VALUES (?, ?, ?)';
    // roda a query com os parametros enviados
    const [resultado] = await conexao.execute(sql, [nome, carga_horaria, professor_id || null]);
    // retorna resultado do insert
    return resultado;
  }

  // lista todas as disciplinas do banco
  static async listarTodas() {
    // faz left join pra trazer o nome do professor junto
    const sql = `
      SELECT d.*, p.nome AS professor_nome 
      FROM disciplinas d 
      LEFT JOIN professores p ON d.professor_id = p.id
    `;
    // roda a query
    const [linhas] = await conexao.execute(sql);
    // retorna a lista com todas
    return linhas;
  }

  // busca uma disciplina especifica por id
  static async buscarPorId(id) {
    // query filtrando pelo id e trazendo dados do professor responsável
    const sql = `
      SELECT d.*, p.nome AS professor_nome 
      FROM disciplinas d 
      LEFT JOIN professores p ON d.professor_id = p.id 
      WHERE d.id = ?
    `;
    // executa pasando o id
    const [linhas] = await conexao.execute(sql, [id]);
    // retorna o primeiro resultado (ou undefined)
    return linhas[0];
  }

  // atualiza dados de uma disciplina existente
  static async atualizar(id, nome, carga_horaria, professor_id) {
    // query de update com placeholders
    const sql = 'UPDATE disciplinas SET nome = ?, carga_horaria = ?, professor_id = ? WHERE id = ?';
    // executa passando os novos dados e o id
    const [resultado] = await conexao.execute(sql, [nome, carga_horaria, professor_id || null, id]);
    // retorna o resultado do banco
    return resultado;
  }

  // exclui uma disciplina
  static async deletar(id) {
    // query de delete
    const sql = 'DELETE FROM disciplinas WHERE id = ?';
    // roda o delete no banco
    const [resultado] = await conexao.execute(sql, [id]);
    // retorna o resultado da operacao
    return resultado;
  }
}

// exporta o model pras rotas/controllers usarem
module.exports = DisciplinaModel;
