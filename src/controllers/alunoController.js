// importa o model de alunos
const AlunoModel = require('../models/alunoModel');
// importa o model de cursos para validar se o curso_id realmente existe
const CursoModel = require('../models/cursoModel');

// controller para gerenciar as rotas de alunos
class AlunoController {

  // cadastra um novo aluno
  static async criar(req, res) {
    // try catch para nao quebrar se der erro no banco
    try {
      // desestrutura os dados enviados no body
      const { nome, email, curso_id } = req.body;

      // valida campos obrigatorios
      if (!nome || !email) {
        // bad request avisando que falta campo
        return res.status(400).json({ mensagem: 'Os campos nome e email são obrigatórios.' });
      }

      // expressao regular simples para testar o formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // se nao passar no regex
      if (!emailRegex.test(email)) {
        // retorna bad request avisando do e-mail invalido
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // se informou um curso, valida se ele existe no banco
      if (curso_id) {
        // busca o curso correspondente
        const curso = await CursoModel.buscarPorId(curso_id);
        // se o curso nao existir
        if (!curso) {
          // retorna 404
          return res.status(404).json({ mensagem: 'Curso responsável não encontrado' });
        }
      }

      // insere no banco chamando o model
      await AlunoModel.criar(nome, email, curso_id);

      // sucesso na criacao
      return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso' });
    } catch (erro) {
      // erro interno
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar o aluno.' });
    }
  }

  // lista todos os alunos cadastrados
  static async listarTodos(req, res) {
    // try catch padrao
    try {
      // busca a lista no model
      const alunos = await AlunoModel.listarTodos();
      // devolve a lista com 200
      return res.status(200).json(alunos);
    } catch (erro) {
      // erro no select
      return res.status(500).json({ mensagem: 'Erro interno ao listar os alunos.' });
    }
  }

  // busca um aluno especifico pelo id
  static async buscarPorId(req, res) {
    // try catch para seguranca
    try {
      // pega o id na url
      const { id } = req.params;
      // busca no banco
      const aluno = await AlunoModel.buscarPorId(id);

      // se o aluno nao for encontrado
      if (!aluno) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Aluno não encontrado' });
      }

      // retorna com 200
      return res.status(200).json(aluno);
    } catch (erro) {
      // erro na busca
      return res.status(500).json({ mensagem: 'Erro interno ao buscar o aluno.' });
    }
  }

  // atualiza dados do aluno
  static async atualizar(req, res) {
    // try catch contra quebras do node
    try {
      // pega o id na url
      const { id } = req.params;
      // pega novos dados do body
      const { nome, email, curso_id } = req.body;

      // valida presenca dos campos
      if (!nome || !email) {
        // erro 400
        return res.status(400).json({ mensagem: 'Os campos nome e email são obrigatórios para atualização.' });
      }

      // valida e-mail regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // se nao for email valido
      if (!emailRegex.test(email)) {
        // bad request
        return res.status(400).json({ mensagem: 'O formato do e-mail informado é inválido.' });
      }

      // busca o aluno pra confirmar se ele existe
      const alunoExistente = await AlunoModel.buscarPorId(id);
      // se nao existir
      if (!alunoExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Aluno não encontrado' });
      }

      // se alterou o curso, valida se o novo existe
      if (curso_id) {
        // busca no banco
        const curso = await CursoModel.buscarPorId(curso_id);
        // se o novo curso nao existir
        if (!curso) {
          // retorna 404
          return res.status(404).json({ mensagem: 'Curso responsável não encontrado' });
        }
      }

      // executa o update
      await AlunoModel.atualizar(id, nome, email, curso_id);

      // retorno de sucesso
      return res.status(200).json({ mensagem: 'Aluno atualizado com sucesso' });
    } catch (erro) {
      // erro na operacao
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar o aluno.' });
    }
  }

  // remove um aluno por id
  static async deletar(req, res) {
    // try catch para erros no banco
    try {
      // pega o id na url
      const { id } = req.params;

      // verifica existencia do aluno no banco
      const alunoExistente = await AlunoModel.buscarPorId(id);
      // se nao existir
      if (!alunoExistente) {
        // retorna 404
        return res.status(404).json({ mensagem: 'Aluno não encontrado' });
      }

      // roda a query de delete no model
      await AlunoModel.deletar(id);

      // sucesso na exclusao
      return res.status(200).json({ mensagem: 'Aluno deletado com sucesso' });
    } catch (erro) {
      // tratamento de erro
      return res.status(500).json({ mensagem: 'Erro interno ao deletar o aluno.' });
    }
  }
}

// exporta o controller
module.exports = AlunoController;
