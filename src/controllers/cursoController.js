// importa o model de cursos
const CursoModel = require('../models/cursoModel');

// controller para gerenciar as rotas de cursos
class CursoController {

  // cadastra um novo curso
  static async criar(req, res) {
    // try catch pra seguranca do node
    try {
      // pega os dados que vieram no body
      const { nome, duracao_semestres } = req.body;

      // valida campos obrigatorios
      if (!nome || duracao_semestres === undefined || duracao_semestres === null || duracao_semestres === '') {
        // retorna status 400 avisando do erro
        return res.status(400).json({ mensagem: 'Os campos nome e duracao_semestres são obrigatórios.' });
      }

      // valida se a duracao é um numero positivo
      if (isNaN(duracao_semestres) || Number(duracao_semestres) <= 0) {
        // erro se a duracao for menor/igual a zero
        return res.status(400).json({ mensagem: 'A duração em semestres deve ser um valor numérico maior que zero.' });
      }

      // chama o model pra salvar
      await CursoModel.criar(nome, duracao_semestres);

      // sucesso na criacao
      return res.status(201).json({ mensagem: 'Curso cadastrado com sucesso' });
    } catch (erro) {
      // erro interno do banco
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar o curso.' });
    }
  }

  // lista todos os cursos
  static async listarTodos(req, res) {
    // try catch contra erros no banco
    try {
      // busca todos
      const cursos = await CursoModel.listarTodos();
      // retorna a lista com 200
      return res.status(200).json(cursos);
    } catch (erro) {
      // erro na busca
      return res.status(500).json({ mensagem: 'Erro interno ao listar os cursos.' });
    }
  }

  // busca curso especifico por id
  static async buscarPorId(req, res) {
    // try catch para seguranca
    try {
      // id da url
      const { id } = req.params;
      // busca no model
      const curso = await CursoModel.buscarPorId(id);

      // se nao achar o curso
      if (!curso) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }

      // devolve o curso com 200
      return res.status(200).json(curso);
    } catch (erro) {
      // erro interno
      return res.status(500).json({ mensagem: 'Erro interno ao buscar o curso.' });
    }
  }

  // atualiza dados de um curso
  static async atualizar(req, res) {
    // try catch pra nao quebrar
    try {
      // id da url
      const { id } = req.params;
      // novos dados do body
      const { nome, duracao_semestres } = req.body;

      // valida presenca de campos
      if (!nome || duracao_semestres === undefined || duracao_semestres === null || duracao_semestres === '') {
        // erro 400
        return res.status(400).json({ mensagem: 'Os campos nome e duracao_semestres são obrigatórios para atualização.' });
      }

      // valida tipo/valor de duracao
      if (isNaN(duracao_semestres) || Number(duracao_semestres) <= 0) {
        // erro 400
        return res.status(400).json({ mensagem: 'A duração em semestres deve ser um valor numérico maior que zero.' });
      }

      // verifica se o curso de fato existe
      const cursoExistente = await CursoModel.buscarPorId(id);
      // se nao existir
      if (!cursoExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }

      // atualiza no banco
      await CursoModel.atualizar(id, nome, duracao_semestres);

      // retorno de sucesso
      return res.status(200).json({ mensagem: 'Curso atualizado com sucesso' });
    } catch (erro) {
      // erro no update
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar o curso.' });
    }
  }

  // remove um curso
  static async deletar(req, res) {
    // try catch contra erros sql
    try {
      // id da url
      const { id } = req.params;

      // verifica se o curso existe
      const cursoExistente = await CursoModel.buscarPorId(id);
      // se nao existir
      if (!cursoExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }

      // deleta no model
      await CursoModel.deletar(id);

      // sucesso na exclusao
      return res.status(200).json({ mensagem: 'Curso deletado com sucesso' });
    } catch (erro) {
      // erro interno
      return res.status(500).json({ mensagem: 'Erro interno ao deletar o curso.' });
    }
  }
}

// exporta o controller
module.exports = CursoController;
