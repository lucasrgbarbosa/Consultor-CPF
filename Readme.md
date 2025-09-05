📋 CPF Restricted List API

Uma API RESTful para gerenciamento de CPFs em lista restrita, desenvolvida para substituir o controle manual via planilhas eletrônicas no time de análise antifraude de e-commerce.

🚀 Tecnologias Utilizadas

Node.js - Runtime JavaScript

Express.js - Framework web para API RESTful

SQLite - Banco de dados embutido para persistência

JavaScript - Linguagem de programação

📦 Estrutura do Projeto

cpf-restricted-list/
├── src/
│   ├── app.js          # Configuração do Express e rotas
│   └── database.js     # Configuração do SQLite
├── cpfs.db    # Arquivo do banco de dados (gerado automaticamente)
├── package.json        # Dependências e scripts
└── README.md          # Documentação

🛠️ Instalação e Execução

Pré-requisitos
Node.js (versão 14 ou superior)
npm ou yarn

Passos para executar

Clone o repositório

git clone <url-do-repositorio>
cd cpf-restricted-list

Instale as dependências
npm install

Execute a aplicação
node src/app.js

A API estará disponível em http://localhost:3000