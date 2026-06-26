# API do Sistema Escolar (MVC com Node.js e MySQL)

Esta é uma API REST para gerenciamento de um sistema escolar, abrangendo professores, disciplinas, cursos e alunos. Desenvolvida no padrão MVC (Model-View-Controller) sem o uso de ORM, utilizando consultas SQL puras e seguras.

## Entidades e Relacionamentos
* **Professores**: Cadastro de docentes.
* **Disciplinas**: Vinculadas a um professor responsável (Relacionamento 1-para-M).
* **Cursos**: Cadastro de cursos da escola.
* **Alunos**: Vinculados a um curso (Relacionamento 1-para-M).

## Pré-requisitos
* Node.js (versão 18 ou superior recomendado)
* MySQL ou MariaDB rodando localmente

## Instalação e Configuração

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados. Você pode fazer isso importando o script `escola.sql` ou executando os comandos abaixo na raiz do projeto:
   ```bash
   # Cria o banco 'escola' e as tabelas com as relações
   npm run db:setup

   # Insere dados de teste iniciais em todas as tabelas
   npm run db:seed
   ```
   *Nota: O banco de dados configurado por padrão utiliza o usuário `escola_user` com a senha `escola_pass`.*

## Como Executar

Inicie a aplicação em modo de desenvolvimento com o comando:
```bash
npm run dev
```
O servidor estará ativo no endereço: `http://localhost:3000`.

## Endpoints da API

### Professores
* `POST /professores` - Cadastra um novo professor.
* `GET /professores` - Lista todos os professores.
* `GET /professores/:id` - Busca os detalhes de um professor.
* `PUT /professores/:id` - Atualiza dados do professor.
* `DELETE /professores/:id` - Exclui o cadastro do professor.

### Disciplinas
* `POST /disciplinas` - Cadastra uma nova disciplina vinculada a um professor.
* `GET /disciplinas` - Lista todas as disciplinas (trazendo o nome do professor).
* `GET /disciplinas/:id` - Detalha uma disciplina e seu professor.
* `PUT /disciplinas/:id` - Atualiza dados de uma disciplina.
* `DELETE /disciplinas/:id` - Exclui uma disciplina.

### Cursos
* `POST /cursos` - Cadastra um novo curso.
* `GET /cursos` - Lista todos os cursos.
* `GET /cursos/:id` - Busca os detalhes de um curso.
* `PUT /cursos/:id` - Atualiza dados do curso.
* `DELETE /cursos/:id` - Exclui o cadastro do curso.

### Alunos
* `POST /alunos` - Cadastra um novo aluno vinculado a um curso.
* `GET /alunos` - Lista todos os alunos (trazendo o nome de seu curso).
* `GET /alunos/:id` - Detalha um aluno e seu curso correspondente.
* `PUT /alunos/:id` - Atualiza dados de um aluno.
* `DELETE /alunos/:id` - Exclui um aluno.

## Coleção do Postman
Para facilitar os testes das 20 rotas acima, você pode importar o arquivo `professores.postman_collection.json` diretamente no seu Postman. As requisições já estão separadas por pastas e com corpos JSON pré-configurados!
