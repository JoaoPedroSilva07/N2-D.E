// Importa o modelo ProfessorModel para realizar as operações de banco de dados
const ProfessorModel = require('../models/professorModel');

// Define a classe ProfessorController para gerenciar o fluxo de requisições e respostas da API
class ProfessorController {

  // Método assíncrono para cadastrar um novo professor
  static async criar(req, res) {
    // Bloco try-catch para capturar possíveis erros de execução ou banco de dados
    try {
      // Desestrutura os dados enviados no corpo (body) da requisição
      const { nome, disciplina, email, salario } = req.body;

      // Valida se os campos obrigatórios estão ausentes ou se o salário não foi definido
      if (!nome || !disciplina || !email || salario === undefined || salario === null || salario === '') {
        // Retorna status 400 (Bad Request) e uma mensagem de erro em formato JSON
        return res.status(400).json({ mensagem: 'Todos os campos (nome, disciplina, email, salario) são obrigatórios.' });
      }

      // Expressão regular para validar o formato do e-mail informado
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Verifica se o e-mail não atende ao padrão da expressão regular
      if (!emailRegex.test(email)) {
        // Retorna status 400 (Bad Request) indicando erro no formato do e-mail
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // Verifica se o salário não é um número válido ou se é menor que zero
      if (isNaN(salario) || Number(salario) < 0) {
        // Retorna status 400 (Bad Request) indicando que o salário deve ser não-negativo
        return res.status(400).json({ mensagem: 'O salário deve ser um valor numérico maior ou igual a zero.' });
      }

      // Chama o modelo para persistir os dados do professor no banco e aguarda a conclusão
      await ProfessorModel.criar(nome, disciplina, email, salario);

      // Retorna status 201 (Created) com a mensagem de sucesso exigida pelo formato JSON do PDF
      return res.status(201).json({ mensagem: 'Professor cadastrado com sucesso' });
    } catch (erro) {
      // Retorna status 500 (Internal Server Error) com uma mensagem em caso de falha sistêmica
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar o professor.' });
    }
  }

  // Método assíncrono para listar todos os professores cadastrados
  static async listarTodos(req, res) {
    // Bloco try-catch para garantir o tratamento correto de erros durante a listagem
    try {
      // Solicita a lista completa de professores ao modelo e aguarda o retorno
      const professores = await ProfessorModel.listarTodos();

      // Retorna status 200 (OK) enviando a lista obtida em formato JSON
      return res.status(200).json(professores);
    } catch (erro) {
      // Retorna status 500 (Internal Server Error) com detalhes amigáveis em caso de falha no banco
      return res.status(500).json({ mensagem: 'Erro interno ao listar os professores.' });
    }
  }

  // Método assíncrono para buscar um professor específico pelo seu ID
  static async buscarPorId(req, res) {
    // Bloco try-catch para capturar falhas no processo de busca individual
    try {
      // Obtém o parâmetro id enviado através da URL da rota
      const { id } = req.params;

      // Chama o modelo para buscar o professor correspondente ao ID informado e aguarda
      const professor = await ProfessorModel.buscarPorId(id);

      // Verifica se o professor não foi encontrado no banco de dados
      if (!professor) {
        // Retorna status 404 (Not Found) informando que o registro não existe
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // Retorna status 200 (OK) com os dados detalhados do professor em JSON
      return res.status(200).json(professor);
    } catch (erro) {
      // Retorna status 500 (Internal Server Error) caso ocorra algum erro inesperado
      return res.status(500).json({ mensagem: 'Erro interno ao buscar o professor.' });
    }
  }

  // Método assíncrono para atualizar as informações de um professor existente
  static async atualizar(req, res) {
    // Bloco try-catch para gerenciar erros na operação de atualização
    try {
      // Obtém o parâmetro id da URL do professor que será atualizado
      const { id } = req.params;
      // Desestrutura as informações enviadas no corpo da requisição que serão atualizadas
      const { nome, disciplina, email, salario } = req.body;

      // Valida se os campos necessários para a atualização estão presentes e preenchidos
      if (!nome || !disciplina || !email || salario === undefined || salario === null || salario === '') {
        // Retorna status 400 (Bad Request) alertando sobre campos ausentes
        return res.status(400).json({ mensagem: 'Todos os campos (nome, disciplina, email, salario) são obrigatórios para atualização.' });
      }

      // Expressão regular para validar o formato do e-mail informado na atualização
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Verifica se o e-mail fornecido não cumpre com a expressão regular
      if (!emailRegex.test(email)) {
        // Retorna status 400 (Bad Request) indicando e-mail inválido
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // Valida se o salário atualizado é um valor numérico não-negativo válido
      if (isNaN(salario) || Number(salario) < 0) {
        // Retorna status 400 (Bad Request) informando que o valor deve ser maior ou igual a zero
        return res.status(400).json({ mensagem: 'O salário deve ser um valor numérico maior ou igual a zero.' });
      }

      // Busca o professor no banco antes de atualizar para validar sua existência
      const professorExistente = await ProfessorModel.buscarPorId(id);

      // Se o professor não for encontrado, encerra a requisição retornando 404
      if (!professorExistente) {
        // Retorna o status 404 (Not Found) indicando que o professor não foi localizado
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // Executa a atualização das informações do professor chamando o modelo e aguarda
      await ProfessorModel.atualizar(id, nome, disciplina, email, salario);

      // Retorna o status 200 (OK) com a mensagem de sucesso especificada em português
      return res.status(200).json({ mensagem: 'Professor atualizado com sucesso' });
    } catch (erro) {
      // Retorna o status 500 (Internal Server Error) em caso de problemas técnicos no processo
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar o professor.' });
    }
  }

  // Método assíncrono para deletar um professor a partir de seu identificador
  static async deletar(req, res) {
    // Bloco try-catch para interceptar falhas durante a remoção do registro
    try {
      // Captura o id do professor passado nos parâmetros da rota
      const { id } = req.params;

      // Verifica se o professor de fato existe no banco antes de removê-lo
      const professorExistente = await ProfessorModel.buscarPorId(id);

      // Se o professor não existir, retorna um erro amigável de não encontrado
      if (!professorExistente) {
        // Envia o status 404 (Not Found) sinalizando que o recurso não existe
        return res.status(404).json({ mensagem: 'Professor não encontrado' });
      }

      // Executa a exclusão definitiva do professor no banco de dados e aguarda
      await ProfessorModel.deletar(id);

      // Retorna o status 200 (OK) com a confirmação de que o registro foi excluído com êxito
      return res.status(200).json({ mensagem: 'Professor deletado com sucesso' });
    } catch (erro) {
      // Retorna o status 500 (Internal Server Error) se ocorrer uma falha técnica
      return res.status(500).json({ mensagem: 'Erro interno ao deletar o professor.' });
    }
  }
}

// Exporta o controlador para vincular seus métodos às rotas correspondentes
module.exports = ProfessorController;
