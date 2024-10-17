# Projeto Interdisciplinar - AcademiTrack

## Sobre

O projeto **AcademiTrack** é uma aplicação web desenvolvida para gerenciar e acompanhar o progresso acadêmico de estudantes. Ele oferece funcionalidades como cadastro de alunos, registro de notas, geração de relatórios e muito mais.

### Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para executar código JavaScript no servidor.
- **Express**: Framework para Node.js que facilita a criação de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados da aplicação.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.
- **bcrypt**: Biblioteca para hashing de senhas.
- **dotenv**: Módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.

### Módulos NPM Utilizados

Os módulos NPM utilizados estão listados no arquivo `package.json` do projeto. Alguns dos principais módulos incluem:

- `express`: Framework web para Node.js.
- `mongoose`: ODM (Object Data Modeling) para MongoDB.
- `jsonwebtoken`: Implementação de JSON Web Tokens.
- `bcryptjs`: Biblioteca para hashing de senhas.
- `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.
- `nodemon`: Ferramenta que reinicia automaticamente o servidor Node.js quando arquivos são alterados durante o desenvolvimento.
- `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

## Contribuição

Se você deseja contribuir para o desenvolvimento deste projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Certifique-se de ter o Node.js instalado.
3. Execute o comando `npm install` para instalar as dependências.
4. Configure as variáveis de ambiente necessárias. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example` e adicione as variáveis necessárias.
5. Execute o comando `npm run dev` para iniciar o servidor.
6. Adicione o repositório remoto upstream ao seu fork: `git remote add upstream https://github.com/WebCrafters-ZL/academitrack-back.git`.
7. Crie uma branch com o nome da sua feature: `git checkout -b minha-feature`.
8. Faça as alterações necessárias e adicione os arquivos modificados: `git add .`.
9. Faça o commit das suas alterações: `git commit -m "Minha feature: descrição das alterações"`.
10. Faça o push para o repositório remoto: `git push origin minha-feature`.
11. Abra um pull request para que suas alterações sejam revisadas.

### Requisitos de Contribuição

- Siga as diretrizes de estilo de código do projeto.
- Inclua testes para suas alterações.
- Atualize a documentação conforme necessário.
- Certifique-se de que seu código não quebre a build.

### Suporte

Se você encontrar algum problema ou tiver alguma dúvida, abra uma issue no repositório ou entre em contato com os mantenedores do projeto.
