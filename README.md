# AcademiTrack 🎓

## Sobre o Projeto

AcademiTrack é um sistema de gerenciamento acadêmico desenvolvido como parte de um projeto interdisciplinar. Esta aplicação web foi criada para auxiliar instituições educacionais no acompanhamento do progresso de seus estudantes, oferecendo uma solução completa e intuitiva.

## Funcionalidades Principais

- 📝 Cadastro e gerenciamento de alunos
- 📊 Registro de notas e frequência
- 📈 Geração de relatórios acadêmicos
- 🔐 Autenticação segura de usuários

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB com Mongoose
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: bcryptjs para hash de senhas
- **Desenvolvimento**: Nodemon para hot-reloading

## Estrutura do Projeto

```
academitrack-back/
├── bin/
│   └── www                 # Script de inicialização
├── config/
│   ├── db.js               # Configuração do banco de dados
│   ├── mailer.js           # Configuração de e-mail
│   └── rateLimit.js        # Limitação de requisições
├── controllers/            # Lógica de negócios
├── helpers/
│   └── validarCpf.helper.js
├── middlewares/
│   └── auth.middleware.js  # Middleware de autenticação
├── models/                 # Modelos de dados
├── routes/                 # Definição de rotas da API
├── server.js               # Ponto de entrada da aplicação
└── package.json            # Dependências e scripts
```

## Como Iniciar

1. Clone o repositório:
   ```bash
   git clone https://github.com/WebCrafters-ZL/academitrack-back.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`
   - Adicione as variáveis necessárias (ex: `MONGODB_URI`, `JWT_SECRET`)

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Contribuindo

Este projeto foi desenvolvido para fins acadêmicos, mas contribuições são bem-vindas! Se você é um estudante ou desenvolvedor interessado em melhorar o AcademiTrack, siga estas etapas:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Aprendizados do Projeto

O desenvolvimento do AcademiTrack proporcionou valiosas experiências em:

- Arquitetura de aplicações web modernas
- Implementação de APIs RESTful
- Gerenciamento de banco de dados NoSQL
- Práticas de segurança em aplicações web
- Trabalho colaborativo usando Git e GitHub

## Equipe

Este projeto foi desenvolvido por estudantes da [Fatec Zona Leste](https://fateczl.cps.sp.gov.br/) como parte do curso de [Desenvolvimento de Software Multiplataforma](https://fateczl.cps.sp.gov.br/desenvolvimento-de-software-multiplataforma/).

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

📚 Desenvolvido com paixão pela educação e tecnologia 🖥️
