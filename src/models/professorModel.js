// Importa o pool de conexões configurado no arquivo conexao.js
const conexao = require('../database/conexao');

// Define a classe ProfessorModel para agrupar as operações de banco de dados
class ProfessorModel {

  // Método assíncrono para inserir um novo professor no banco de dados
  static async criar(nome, disciplina, email, salario) {
    // Define a query SQL para inserir os dados do novo professor na tabela
    const sql = 'INSERT INTO professores (nome, disciplina, email, salario) VALUES (?, ?, ?, ?)';
    // Executa a query utilizando os parâmetros fornecidos e aguarda o resultado
    const [resultado] = await conexao.execute(sql, [nome, disciplina, email, salario]);
    // Retorna o resultado da inserção contendo o ID gerado e metadados
    return resultado;
  }

  // Método assíncrono para listar todos os professores cadastrados no banco de dados
  static async listarTodos() {
    // Define a query SQL para selecionar todos os registros da tabela professores
    const sql = 'SELECT * FROM professores';
    // Executa a query e aguarda o retorno das linhas encontradas
    const [linhas] = await conexao.execute(sql);
    // Retorna a lista contendo todos os registros de professores obtidos
    return linhas;
  }

  // Método assíncrono para buscar um professor específico através de seu identificador (id)
  static async buscarPorId(id) {
    // Define a query SQL para selecionar o professor com o ID correspondente
    const sql = 'SELECT * FROM professores WHERE id = ?';
    // Executa a query passando o ID por parâmetro para evitar SQL Injection e aguarda o resultado
    const [linhas] = await conexao.execute(sql, [id]);
    // Retorna a primeira linha encontrada ou undefined caso nenhum registro coincida
    return linhas[0];
  }

  // Método assíncrono para atualizar os dados de um professor existente no banco de dados
  static async atualizar(id, nome, disciplina, email, salario) {
    // Define a query SQL para atualizar os campos do professor correspondente ao ID
    const sql = 'UPDATE professores SET nome = ?, disciplina = ?, email = ?, salario = ? WHERE id = ?';
    // Executa a query de atualização com os novos valores e o ID, aguardando a finalização
    const [resultado] = await conexao.execute(sql, [nome, disciplina, email, salario, id]);
    // Retorna o resultado da operação indicando a quantidade de linhas afetadas
    return resultado;
  }

  // Método assíncrono para excluir o registro de um professor a partir de seu ID
  static async deletar(id) {
    // Define a query SQL para deletar o registro da tabela baseado no ID fornecido
    const sql = 'DELETE FROM professores WHERE id = ?';
    // Executa a instrução SQL de remoção de forma segura e aguarda o resultado do banco
    const [resultado] = await conexao.execute(sql, [id]);
    // Retorna o resultado da operação para confirmar se o registro foi deletado com sucesso
    return resultado;
  }
}

// Exporta o modelo para que possa ser utilizado pelos controladores da aplicação
module.exports = ProfessorModel;
