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
git clone [https://github.com/seu-usuario/projeto-login.git](https://github.com/mayara-gregorio/Docker-App-Login.git)
cd Docker-App-Login
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
}
```

**Erros possíveis:**
| Status | Mensagem |
|--------|----------|
| 400 | Ausência de parâmetros. |
| 400 | Usuário já registrado. |

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
  "message": "Login efetuado com sucesso!"
}
```

**Erros possíveis:**
| Status | Mensagem |
|--------|----------|
| 401 | Credenciais inválidas. |

---

## Prova de Fogo — Testando a Persistência dos Dados

Este teste comprova que o volume Docker garante que os dados do banco **não se perdem** ao derrubar os containers.

### 1. Cadastre um usuário

Através da URl http://localhost:8000/register faça o cadastro de um usuário.

### 2. Derrube todos os containers

```bash
docker compose down
```

> Não use a flag `-v` aqui. `docker compose down -v` também apagaria o volume nomeado (`dados_projeto_usuarios`), e o teste deixaria de provar o que precisa provar.

### 3. Suba o ambiente de novo, do zero

```bash
docker compose up -d
```

### 4. Tente logar com o mesmo usuário

Através da URl http://localhost:8000/login logue com um usuário já criado.

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
Docker-App-Login/
├── app/
│   ├── (auth)/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Painel protegido (só acessível autenticado)
│   │   ├── login/
│   │   │   └── page.tsx        # Tela de login
│   │   └── register/
│   │       └── page.tsx        # Tela de cadastro
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts     # Verifica credenciais e gera o JWT
│   │   │   ├── logout/route.ts    # Remove o cookie de sessão
│   │   │   └── register/route.ts  # Cria o usuário (hash da senha com bcrypt)
│   │   └── lib/
│   │       └── prisma.ts          # Instância global do Prisma Client
│   ├── globals.css
│   ├── layout.tsx                 # Layout raiz da aplicação
│   └── page.tsx                   # Página inicial
├── prisma/
│   ├── migrations/                # Histórico de migrations do banco
│   └── schema.prisma               # Modelo de dados (model User)
├── public/                        # Ícones estáticos padrão do Next.js
├── .dockerignore
├── .env                            # Variáveis reais (versionado para testes)
├── .gitignore
├── docker-compose.yml              # Orquestração dos containers
├── Dockerfile                      # Empacotamento da aplicação web
├── package.json
├── prisma.config.ts                # Configuração do Prisma (lê DATABASE_URL)
├── proxy.ts                        # Middleware: protege rotas que exigem login
└── README.md
```
---

## Equipe

| Aluno | Responsabilidade |
|-------|-----------------|
| Mayara Gregório | Backend (API Routes, autenticação, middleware) |
| Josué Hudson | Frontend (telas de login, cadastro e dashboard) |
| Gabriel | Docker (Dockerfile, docker-compose.yml, README) |
