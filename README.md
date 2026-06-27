# Projeto Mini SaaS
<img src="/frontend/public/assets/logo.png" alt="Logo"/>
Um projeto mini saas construido por mim 😉

## 🧾 Índice
- <a href="#funcionalidade">Funcionalidades do Projeto</a>
- <a href="#layout">Layout</a>
- <a href="#demonstracao">Demonstração</a>
- <a href="#rodar">Como rodar este projeto?</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#autor">Pessoa Autora</a>
- <a href="#passos">Próximos Passos</a>

## 📱 Funcionalidades do Projeto

- [x] Login
- [x] Perfil
- [x] Dashboard
- [x] Cadastro de Usuários
- [x] Cadastro de Clientes
- [x] Cadastro de Produtos
- [x] Criação de Ordem de Serviços
- [x] Visualização de Ordem de Serviços
- [x] Edição de Ordem de Serviços (Cancelar, Atualizar, Finalizar)
- [x] Lista de Usuários
- [x] Lista de Clientes
- [x] Lista de Produtos
- [x] Lista de Ordem de Serviços

## 📊 Layout

![tela de login](/frontend/public/projeto/login.PNG)
![perfil usuario](/frontend/public/projeto/perfil.PNG)
![dashboard](/frontend/public/projeto/dashboard.PNG)
![cadastro de usuario](/frontend/public/projeto/cadastro-usuario.PNG)
![lista de usuarios](/frontend/public/projeto/lista-usuarios.PNG)
![cadastro de cliente](/frontend/public/projeto/cadastro-cliente.PNG)
![lista de clientes](/frontend/public/projeto/lista-clientes.PNG)
![cadastro de produto](/frontend/public/projeto/cadastro-produto.PNG)
![lista de produtos](/frontend/public/projeto/lista-produtos.PNG)
![criação de ordem cliente](/frontend/public/projeto/escolher-cliente-ordem.PNG)
![cadastro de ordem](/frontend/public/projeto/cadastro-ordem.PNG)
![visualizacao de ordem](/frontend/public/projeto/visualizar-ordem.PNG)
![editar ordem](/frontend/public/projeto/editar-ordem.PNG)
![lista de ordens](/frontend/public/projeto/lista-ordens.PNG)

## Demonstração

[Link Demonstração](https://mini-saas-lovat.vercel.app)

Para efetuar o login basta digitar as credenciais:
**email**: admin@minisaas.com
**senha**: admin

## 💡 Como rodar este projeto?

```bash
#Clone este repositório
$ git clone mini-saas

# Acesse a pasta do projeto no seu terminal
cd mini-saas
```

O projeto é composto por backend e frontend,
sabendo disso, vamos então começar pelo backend:

```
# Acesse a pasta backend no seu terminal
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev

# A aplicação backend será iniciada na porta 8000
```

Agora vem a parte do frontend:

```
# Abra um novo terminal e acesse a pasta frontend
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev

# A aplicação frontend será iniciada na porta 3000,
acesse pelo navegador: http://localhost:3000

# Para efetuar o login basta digitar as credenciais
de administrador que foram criadas automáticamente

# email: admin@minisaas.com
senha: admin
```

## 🔎 Tecnologias Utilizadas

### Backend

1. [Node.js](https://nodejs.org/)
2. [TypeScript](https://www.typescriptlang.org/)
3. [NestJS](https://nestjs.com/)
4. [Prisma ORM](https://www.prisma.io/)
5. [PostgreSQL](https://www.postgresql.org/)
6. [JWT (JSON Web Token)](https://jwt.io/)
7. [Passport.js](https://www.passportjs.org/)
8. [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
9. [Swagger (OpenAPI)](https://swagger.io/)
10. [class-validator](https://github.com/typestack/class-validator)
11. [class-transformer](https://github.com/typestack/class-transformer)
12. [RxJS](https://rxjs.dev/)
13. [UUID](https://github.com/uuidjs/uuid)
14. [Jest](https://jestjs.io/)
15. [Supertest](https://github.com/ladjs/supertest)
16. [ESLint](https://eslint.org/)
17. [Prettier](https://prettier.io/)

### Frontend

1. [Next.js](https://nextjs.org/)
2. [React](https://react.dev/)
3. [TypeScript](https://www.typescriptlang.org/)
4. [Tailwind CSS](https://tailwindcss.com/)
5. [TanStack React Query](https://tanstack.com/query/latest)
6. [Axios](https://axios-http.com/)
7. [NextAuth.js](https://next-auth.js.org/)
8. [js-cookie](https://github.com/js-cookie/js-cookie)
9. [React Icons](https://react-icons.github.io/react-icons/)
10. [React Paginate](https://github.com/AdeleD/react-paginate)
11. [ESLint](https://eslint.org/)

## Pessoa Autora

<img src="/frontend/public/projeto/felipe.jpeg" alt="Imagem do desenvolvedor" width="150px"/>

[Linkedin](www.linkedin.com/in/felipe-alencar-ba39b0263)

## Próximos Passos

- [ ] Gerar PDF da ordem de serviço
- [ ] Melhorar Dashboard (implementar gráficos)
- [ ] Permitir alterar perfil do usuário









