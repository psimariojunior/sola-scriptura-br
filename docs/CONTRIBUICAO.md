# Contribuição - Sola Scriptura BR

## Como Contribuir

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- PostgreSQL 16
- Git

### Setup Local

```bash
# Clone
git clone https://github.com/sola-scriptura/plataforma.git
cd plataforma

# Instalar dependências
npm install
cd backend && npm install
cd ../frontend && npm install

# Subir infraestrutura
npm run docker:up

# Rodar migrations
npm run migration:run

# Iniciar desenvolvimento
npm run dev
```

### Commits

Seguir Conventional Commits:
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Build/config

### Pull Requests

1. Fork do repositório
2. Crie branch: `feat/nome-da-feature`
3. Commit com mensagens claras
4. Abra PR descritivo
5. Aguarde review

### Testes

```bash
# Unitários
npm run test

# Integração
npm run test:e2e

# Cobertura
npm run test:cov
```

### Código de Conduta

- Respeito acima de tudo
- Código limpo e documentado
- Revisão de código obrigatória
- Testes para toda funcionalidade
