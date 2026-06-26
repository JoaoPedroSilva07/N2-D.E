// Importa o model para falar com o banco de dados
const ProfessorModel = require('../models/professorModel');

// Controller pra lidar com as requisiçoes de professores
class ProfessorController {

  // cadastra um novo professor
  static async criar(req, res) {
    // try catch para nao quebrar a aplicacao se der ruim no banco
    try {
      // pega os dados q vieram no corpo da requisicao
      const { nome, disciplina, email, salario } = req.body;

      // valida se todos os campos obrigatorios foram enviados
      if (!nome || !disciplina || !email || salario === undefined || salario === null || salario === '') {
        // retorna status 400 avisando que falta campo
        return res.status(400).json({ mensagem: 'Todos os campos (nome, disciplina, email, salario) são obrigatórios.' });
      }

      // expressao regular simples pra testar se o email é valido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // se nao passar no regex, da erro
      if (!emailRegex.test(email)) {
        // retorna bad request avisando do email
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // valida se o salario é positivo ou se nao é um numero valido
      if (isNaN(salario) || Number(salario) < 0) {
        // da erro avisando sobre o valor do salario
        return res.status(400).json({ mensagem: 'O salário deve ser um valor numérico maior ou igual a zero.' });
      }

      // chama o model pra inserir o registro no banco
      await ProfessorModel.criar(nome, disciplina, email, salario);

      // retorna status 201 com a mensagem q o pdf pede
      return res.status(201).json({ mensagem: 'Professor cadastrado com sucesso' });
    } catch (erro) {
      // erro interno do servidor
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar o professor.' });
    }
  }

  // lista todos os professores
  static async listarTodos(req, res) {
    // try catch padrao pra tratar erros
    try {
      // puxa todos os dados do model
      const professores = await ProfessorModel.listarTodos();

      // retorna a lista com status 200
      return res.status(200).json(professores);
    } catch (erro) {
      // se der erro no select
      return res.status(500).json({ mensagem: 'Erro interno ao listar os professores.' });
    }
  }

  // busca um unico professor por id
  static async buscarPorId(req, res) {
    // try catch para seguranca
    try {
      // pega o id dos parametros da url
      const { id } = req.params;

      // busca no model filtrando pelo id
      const professor = await ProfessorModel.buscarPorId(id);

      // se nao achar nada no banco
      if (!professor) {
        // retorna status 404
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // se achar, devolve o objeto do professor
      return res.status(200).json(professor);
    } catch (erro) {
      // erro de conexao ou query
      return res.status(500).json({ mensagem: 'Erro interno ao buscar o professor.' });
    }
  }

  // atualiza dados do professor
  static async atualizar(req, res) {
    // try catch pra nao travar o node
    try {
      // id do professor na url
      const { id } = req.params;
      // novos dados no body
      const { nome, disciplina, email, salario } = req.body;

      // valida campos obrigatorios
      if (!nome || !disciplina || !email || salario === undefined || salario === null || salario === '') {
        // erro 400 se faltar dado
        return res.status(400).json({ mensagem: 'Todos os campos (nome, disciplina, email, salario) são obrigatórios para atualização.' });
      }

      // valida o email de novo no update
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // se nao for email valido
      if (!emailRegex.test(email)) {
        // bad request
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // valida o salario tambem
      if (isNaN(salario) || Number(salario) < 0) {
        // erro se for negativo
        return res.status(400).json({ mensagem: 'O salário deve ser um valor numérico maior ou igual a zero.' });
      }

      // verifica se o professor existe antes de atualizar
      const professorExistente = await ProfessorModel.buscarPorId(id);

      // se nao existir
      if (!professorExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // atualiza de fato no banco de dados
      await ProfessorModel.atualizar(id, nome, disciplina, email, salario);

      // retorna a mensagem de atualizado com sucesso
      return res.status(200).json({ mensagem: 'Professor atualizado com sucesso' });
    } catch (erro) {
      // se der erro na atualizacao
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar o professor.' });
    }
  }

  // deleta professor por id
  static async deletar(req, res) {
    // try catch contra erros no banco
    try {
      // pega o id na url
      const { id } = req.params;

      // valida se o professor existe antes de tentar deletar
      const professorExistente = await ProfessorModel.buscarPorId(id);

      // se nao achar o cara no banco
      if (!professorExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // deleta o registro no model
      await ProfessorModel.deletar(id);

      // sucesso na exclusao
      return res.status(200).json({ mensagem: 'Professor deletado com sucesso' });
    } catch (erro) {
      // tratamento de erro
      return res.status(500).json({ mensagem: 'Erro interno ao deletar o professor.' });
    }
  }
}

// exporta o controller pro router
module.exports = ProfessorController;
