# Docker-App-Login
Trata-se de uma aplicação fullstack de Cadastro e Login de Usuários



# Sistema de Autenticação com Docker Compose

Projeto desenvolvido para a disciplina **Sistemas para Internet** (Prof. Igo Moura) como atividade prática avaliativa sobre orquestração de múltiplos containers com Docker Compose.

## Descrição

API de autenticação de usuários construída com **Next.js**, **Prisma ORM** e **PostgreSQL**, totalmente containerizada com Docker Compose. O sistema permite cadastro de usuários, login com geração de token JWT e persistência garantida por volumes Docker.

---

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Framework Web | Next.js 14 (App Router) |
| ORM | Prisma 5 |
| Banco de Dados | PostgreSQL 15 |
| Autenticação | JWT (jsonwebtoken) |
| Hash de senha | bcryptjs |
| Containerização | Docker + Docker Compose |

---

## Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado
- Git instalado

---

## Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/projeto-login.git
cd projeto-login
```

### 2. Subir o ambiente com Docker Compose
```bash
docker compose up -d --build
```

### 3. Verificar se os containers estão rodando
```bash
docker compose ps
```

### 4. Acessar a aplicação
Abra o navegador em: [http://localhost:8000](http://localhost:8000)

---

##  Rotas da API

### POST `/api/auth/register` — Cadastrar Usuário

**Corpo da requisição (JSON):**
```json
{
  "name": "Aluno IFMA",
  "email": "aluno@ifma.edu.br",
  "password": "minhasenhasegura"
}
```

**Resposta de sucesso (201):**
```json
{
  "message": "Usuário criado com sucesso!",
  "userId": "uuid-gerado"
}
```

**Erros possíveis:**
| Status | Mensagem |
|--------|----------|
| 400 | E-mail e senha são obrigatórios. |
| 400 | Este e-mail já está cadastrado. |
| 500 | Erro interno no servidor. |

---

### POST `/api/auth/login` — Fazer Login

**Corpo da requisição (JSON):**
```json
{
  "email": "aluno@ifma.edu.br",
  "password": "minhasenhasegura"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Login efetuado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Aluno IFMA",
    "email": "aluno@ifma.edu.br"
  }
}
```

**Erros possíveis:**
| Status | Mensagem |
|--------|----------|
| 401 | Credenciais inválidas. |
| 500 | Erro interno no servidor. |

---

##  Prova de Fogo — Testando a Persistência dos Dados

Este teste comprova que o **volume Docker** garante que os dados do banco de dados **não se perdem** ao derrubar os containers.

```bash
# 1. Cadastre um usuário (via Postman, Insomnia ou Thunder Client)
# POST http://localhost:8000/api/auth/register

# 2. Derrube todos os containers
docker compose down

# 3. Suba novamente do zero
docker compose up -d

# 4. Tente fazer login com o usuário cadastrado antes
# POST http://localhost:8000/api/auth/login
# Se o login funcionar, a persistência está garantida!
```

---

## Tabela de Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `docker compose up -d --build` | Sobe o ambiente reconstruindo as imagens |
| `docker compose up -d` | Sobe o ambiente (sem rebuild) |
| `docker compose down` | Derruba todos os containers |
| `docker compose logs -f` | Acompanha os logs em tempo real |
| `docker compose logs web` | Logs apenas do container Next.js |
| `docker compose logs db` | Logs apenas do PostgreSQL |
| `docker compose ps` | Lista os containers em execução |
| `docker compose restart web` | Reinicia apenas o container da aplicação |

---

## Estrutura do Projeto

```
projeto-login/
├── prisma/
│   └── schema.prisma        # Modelo do banco de dados
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── register/route.ts  # Rota de cadastro
│   │   │       └── login/route.ts     # Rota de login
│   │   └── page.tsx         # Página inicial
│   └── lib/
│       └── prisma.ts        # Conexão global com o banco
├── Dockerfile               # Empacotamento da aplicação
├── docker-compose.yml       # Orquestração dos containers
├── .env.example             # Exemplo de variáveis de ambiente
└── README.md
```

---

## Equipe

| Aluno | Responsabilidade |
|-------|-----------------|
| Aluno 1 | Backend (API Routes, autenticação, middleware) |
| Aluno 2 | Frontend (telas de login, cadastro e dashboard) |
| Aluno 3 | Docker (Dockerfile, docker-compose.yml, README) |