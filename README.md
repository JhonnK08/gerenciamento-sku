# 📦 Gerenciamento de SKUs  

## 📖 Descrição  
Sistema para **gerenciamento de SKUs**, permitindo o cadastro e a alteração de seus estados conforme regras de fluxo definidas.  

## 🚀 Funcionalidades  
- Cadastro e edição de SKUs.  
- Alteração do fluxo (status) de um SKU de acordo com regras estabelecidas.  

## 🛠️ Tecnologias utilizadas  

### Backend  
- **Node.js** (>=20)  
- **NestJS**  
- **Prisma ORM**  
- **MySQL**  
- **Docker**  
- **Jest** (testes)  

### Frontend  
- **React**  
- **TailwindCSS**  
- [**Shadcn**](https://ui.shadcn.com/)  
- [**React Hook Form**](https://react-hook-form.com/)
- [**TanStack Query**](https://tanstack.com/query/latest)  
- [**TanStack Table**](https://tanstack.com/table/latest)  
- **Jest** (testes)  

## 📐 Padrões e Estrutura  
- **Monorepo** com [pnpm workspaces](https://pnpm.io/workspaces)  
- **ESLint**
- **Prettier**

## ⚙️ Pré-requisitos  
- [Node.js](https://nodejs.org/) versão 20 ou superior  
- [pnpm](https://pnpm.io/) instalado globalmente  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  

## 📂 Estrutura de pastas  
```bash
packages/
  backend/   # API em NestJS
  frontend/  # Aplicação React
  prisma/    # Configurações do banco + schema.prisma
```

## 🗄️ Configuração do Banco de Dados  
Na pasta `packages/prisma` existe um arquivo `.env` que precisa ser preenchido com as credenciais do MySQL.  

Exemplo:  
```env
DATABASE_URL="mysql://user:password@localhost:3306/sku_db"
```

### Subindo o banco com Docker  
```bash
docker compose up -d
```

### Rodando as migrations  
```bash
pnpm -F prisma migrate-dev
```

## ▶️ Como rodar o projeto  

### Instalar dependências  
```bash
pnpm i
```

### Ambiente de desenvolvimento  
```bash
pnpm -F backend start:dev
pnpm -F frontend dev
```

### Ambiente de produção (build)  
```bash
pnpm -F backend start
pnpm -F frontend build
```

## 🧪 Rodando os testes  

### Backend  
```bash
pnpm -F backend test     # Testes unitários
pnpm -F backend test:cov # Coverage de testes
pnpm -F backend test:e2e # Testes E2E
pnpm -F backend test:int # Teste de Integração (Prisma)
```

### Frontend  
```bash
pnpm -F frontend test
```
