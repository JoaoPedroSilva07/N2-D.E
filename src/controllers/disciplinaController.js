// importa o model de disciplinas
const DisciplinaModel = require('../models/disciplinaModel');
// importa o model de professores pra validar se o id do prof existe
const ProfessorModel = require('../models/professorModel');

// controller para gerenciar as operacoes de disciplinas
class DisciplinaController {

  // cria uma nova disciplina
  static async criar(req, res) {
    // try catch para nao quebrar se der pau no banco
    try {
      // desestrutura os dados enviados no body
      const { nome, carga_horaria, professor_id } = req.body;

      // valida campos obrigatorios (carga_horaria pode ser 0? melhor maior que 0)
      if (!nome || carga_horaria === undefined || carga_horaria === null || carga_horaria === '') {
        // bad request avisando que falta campo
        return res.status(400).json({ mensagem: 'Os campos nome e carga_horaria são obrigatórios.' });
      }

      // valida se a carga horaria é um numero valido e maior que zero
      if (isNaN(carga_horaria) || Number(carga_horaria) <= 0) {
        // erro de carga horaria
        return res.status(400).json({ mensagem: 'A carga horária deve ser um valor numérico maior que zero.' });
      }

      // se informou um professor, valida se ele realmente existe no banco
      if (professor_id) {
        // busca o professor
        const professor = await ProfessorModel.buscarPorId(professor_id);
        // se o professor nao existir
        if (!professor) {
          // retorna 404
          return res.status(404).json({ mensagem: 'Professor responsável não encontrado' });
        }
      }

      // insere no banco chamando o model
      await DisciplinaModel.criar(nome, carga_horaria, professor_id);

      // sucesso na criacao
      return res.status(201).json({ mensagem: 'Disciplina cadastrada com sucesso' });
    } catch (erro) {
      // erro interno
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar a disciplina.' });
    }
  }

  // lista todas as disciplinas cadastradas
  static async listarTodos(req, res) {
    // try catch padrao
    try {
      // busca a lista no model
      const disciplinas = await DisciplinaModel.listarTodas();
      // devolve a lista com 200
      return res.status(200).json(disciplinas);
    } catch (erro) {
      // erro no select
      return res.status(500).json({ mensagem: 'Erro interno ao listar as disciplinas.' });
    }
  }

  // busca uma disciplina pelo id
  static async buscarPorId(req, res) {
    // try catch para seguranca
    try {
      // pega o id na url
      const { id } = req.params;
      // busca no banco
      const disciplina = await DisciplinaModel.buscarPorId(id);

      // se a disciplina nao for encontrada
      if (!disciplina) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
      }

      // retorna com 200
      return res.status(200).json(disciplina);
    } catch (erro) {
      // erro na busca
      return res.status(500).json({ mensagem: 'Erro interno ao buscar a disciplina.' });
    }
  }

  // atualiza dados da disciplina
  static async atualizar(req, res) {
    // try catch contra quebras do node
    try {
      // pega o id na url
      const { id } = req.params;
      // pega novos dados do body
      const { nome, carga_horaria, professor_id } = req.body;

      // valida presenca dos campos
      if (!nome || carga_horaria === undefined || carga_horaria === null || carga_horaria === '') {
        // erro 400
        return res.status(400).json({ mensagem: 'Os campos nome e carga_horaria são obrigatórios para atualização.' });
      }

      // valida tipo/valor da carga horaria
      if (isNaN(carga_horaria) || Number(carga_horaria) <= 0) {
        // erro 400
        return res.status(400).json({ mensagem: 'A carga horária deve ser um valor numérico maior que zero.' });
      }

      // busca a disciplina pra confirmar se ela existe
      const disciplinaExistente = await DisciplinaModel.buscarPorId(id);
      // se nao existir
      if (!disciplinaExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
      }

      // se alterou o professor, valida se o novo existe
      if (professor_id) {
        // busca no banco
        const professor = await ProfessorModel.buscarPorId(professor_id);
        // se o novo professor nao existir
        if (!professor) {
          // retorna 404
          return res.status(404).json({ mensagem: 'Professor responsável não encontrado' });
        }
      }

      // executa o update
      await DisciplinaModel.atualizar(id, nome, carga_horaria, professor_id);

      // retorno de sucesso
      return res.status(200).json({ mensagem: 'Disciplina atualizada com sucesso' });
    } catch (erro) {
      // erro na operacao
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar a disciplina.' });
    }
  }

  // remove uma disciplina por id
  static async deletar(req, res) {
    // try catch para erros no banco
    try {
      // pega o id na url
      const { id } = req.params;

      // verifica existencia da disciplina no banco
      const disciplinaExistente = await DisciplinaModel.buscarPorId(id);
      // se nao existir
      if (!disciplinaExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
      }

      // roda a query de delete no model
      await DisciplinaModel.deletar(id);

      // sucesso na exclusao
      return res.status(200).json({ mensagem: 'Disciplina deletada com sucesso' });
    } catch (erro) {
      // tratamento de erro
      return res.status(500).json({ mensagem: 'Erro interno ao deletar a disciplina.' });
    }
  }
}

// exporta o controller
module.exports = DisciplinaController;
