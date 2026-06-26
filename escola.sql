-- Script de criação do banco de dados e tabelas para o projeto escolar
-- Criação do banco de dados 'escola' se ele não existir
CREATE DATABASE IF NOT EXISTS escola;

-- Seleciona o banco de dados 'escola' para uso
USE escola;

-- Criação da tabela 'professores' conforme a estrutura obrigatória do PDF
CREATE TABLE IF NOT EXISTS professores (
  id INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único auto-incrementado
  nome VARCHAR(100) NOT NULL,         -- Nome do professor (até 100 caracteres)
  disciplina VARCHAR(100) NOT NULL,   -- Disciplina lecionada (até 100 caracteres)
  email VARCHAR(100) NOT NULL,        -- E-mail de contato (até 100 caracteres)
  salario DECIMAL(10,2) NOT NULL      -- Salário com precisão de 2 casas decimais
);

-- Criação da tabela 'disciplinas' relacionada a professores
CREATE TABLE IF NOT EXISTS disciplinas (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- ID único da disciplina
  nome VARCHAR(100) NOT NULL,          -- Nome da disciplina (ex: Programação)
  carga_horaria INT NOT NULL,          -- Carga horária em horas
  professor_id INT,                    -- Referência ao ID do professor
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL -- Limpa se o professor for deletado
);

-- Criação da tabela de 'cursos'
CREATE TABLE IF NOT EXISTS cursos (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- ID único do curso
  nome VARCHAR(100) NOT NULL,          -- Nome do curso (ex: Engenharia de Computação)
  duracao_semestres INT NOT NULL       -- Duração do curso em semestres
);

-- Criação da tabela de 'alunos' relacionada a cursos
CREATE TABLE IF NOT EXISTS alunos (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- ID único do aluno
  nome VARCHAR(100) NOT NULL,          -- Nome do aluno
  email VARCHAR(100) NOT NULL,         -- E-mail do aluno
  curso_id INT,                        -- Referência ao ID do curso
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL -- Limpa se o curso for deletado
);

-- Cria o usuário específico para a aplicação e concede os privilégios necessários
CREATE USER IF NOT EXISTS 'escola_user'@'localhost' IDENTIFIED BY 'escola_pass';
GRANT ALL PRIVILEGES ON escola.* TO 'escola_user'@'localhost';
FLUSH PRIVILEGES;
