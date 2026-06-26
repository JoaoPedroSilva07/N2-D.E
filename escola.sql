-- Script de criação do banco de dados e tabela para o projeto
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

-- Cria o usuário específico para a aplicação e concede os privilégios necessários
CREATE USER IF NOT EXISTS 'escola_user'@'localhost' IDENTIFIED BY 'escola_pass';
GRANT ALL PRIVILEGES ON escola.* TO 'escola_user'@'localhost';
FLUSH PRIVILEGES;
