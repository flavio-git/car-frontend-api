# Projeto Final - Front-end com Next.JS [25E4_3]

Este projeto foi desenvolvido como parte da avaliação da disciplina
**Front-end com Next.JS [25E4_3]**, do curso de _Pós-Graduação Lato Sensu_ em
**MIT - Desenvolvimento Full Stack**, oferecido pelo
**Instituto INFNET**.

## 🎯 Objetivo

O objetivo deste projeto é criar uma aplicação frontend utilizando o Next.JS conectando com uma aplicação backend.

## 🚀 Deploy da aplicação

### Vercel

A aplicação teve o seu deploy na plataforma Vercel. Você pode consultar em "".

### Backend

Você pode consultar o código fonte do backend e suas instruções para rodar localmente em
https://github.com/flavio-git/car-backend-api.

## 🔎 Visão geral

A aplicação consiste em uma API de carros. O usuário poderá consultar, editar e excluir carros cadastrados no backend através de login no app.

## 🏠 Como rodar localmente

Você pode rodar localmente a aplicação. Para tanto você deve antes estar com o backend rodando localmente.

### _crie uma pasta para o projeto_

```bash
mkdir projeto-carro-api
cd projeto-carro-api
```

### _backend - local_

Certifique que você possuí o [Maven](https://maven.apache.org/install.html) antes de rodar localmente o backend.

_baixando o repositório_

```bash
git clone https://github.com/flavio-git/car-backend-api
cd car-backend-api
```

_construindo com o maven_

```bash
mvn clean install -Dmaven.test.skip
```

_rodando_

```bash
mvn spring-boot:run
```

O backend estará rodando em (http://localhost:8080).

### _frontend - local_

- Volte para a pasta raiz do projeto (projeto-car-api)

Certifique que você possuí o [NPM](https://www.npmjs.com/) antes de rodar localmente o frontend.

_baixando o repositório_

```bash
git clone https://github.com/flavio-git/car-frontend-api
cd car-frontend-api
```

_instale as dependências_

```bash
npm install
```

#### ⚙️ Variáveis de ambiente

_Copie `.env.example` para `.env`_:

```bash
cp .env.example .env
```

_inicie em modo de desenvolvimento_:

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

---

📘 Informações Acadêmicas

✍️ Autor: Flávio Vicentini
🚀 Bloco: Front-end com Jamstack [25E4-25E4]
📚 Disciplina: Front-end com Next.JS [25E4_3]
🎓 Curso: MIT - Desenvolvimento Full Stack
🏫 Instituição: Instituto INFNET
