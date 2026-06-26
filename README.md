# API de Cadastro de Professores

Esta é uma API REST simples para cadastro e gerenciamento de professores, desenvolvida como parte de uma avaliação prática. O projeto segue o padrão arquitetural MVC (Model-View-Controller) sem o uso de ORM, realizando consultas SQL diretas.

## Pré-requisitos
* Node.js (versão 18 ou superior recomendado)
* MySQL ou MariaDB rodando localmente

## Instalação e Configuração

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados utilizando o script `escola.sql` localizado na raiz do projeto:
   ```bash
   mysql -u root -p < escola.sql
   ```
   *Nota: O script criará o banco `escola` e a tabela `professores`, além de configurar o usuário `escola_user` com a senha `escola_pass`.*

## Como Executar

Inicie a aplicação em modo de desenvolvimento com o comando:
```bash
npm run dev
```
O servidor estará ativo no endereço: `http://localhost:3000`.

## Endpoints da API

* `POST /professores` - Cadastra um novo professor.
* `GET /professores` - Lista todos os professores cadastrados.
* `GET /professores/:id` - Busca os detalhes de um professor pelo ID.
* `PUT /professores/:id` - Atualiza as informações de um professor.
* `DELETE /professores/:id` - Exclui o cadastro de um professor.

Para facilitar os testes, você pode importar o arquivo `professores.postman_collection.json` diretamente no seu Postman.
