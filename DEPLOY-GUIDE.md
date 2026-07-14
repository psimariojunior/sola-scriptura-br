# Guia de Deploy - Sola Scriptura BR

## Passo 1: Push das alterações para o GitHub

```bash
cd sola-scriptura-br
git add .
git commit -m "fix: backend modules, JWT security, health check, layout responsive"
git push origin main
```

---

## Passo 2: Configurar PostgreSQL no Railway

1. Acesse [railway.app](https://railway.app) e crie um novo projeto
2. Clique em **"New"** → **"Database"** → **"PostgreSQL"**
3. Railway vai criar um PostgreSQL automaticamente
4. Na página do banco, vá na aba **"Variables"** e copie:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`
   - `DATABASE_URL`

---

## Passo 3: Deploy do Backend no Railway

1. No mesmo projeto, clique em **"New"** → **"GitHub Repo"**
2. Selecione o repositório `psimariojunior/sola-scriptura-br`
3. **IMPORTANTE**: Nas configurações do serviço:
   - **Root Directory**: `backend` (digite `backend` manualmente)
   - Isso faz o Railway usar o `backend/railway.json` (não o da raiz)

4. Vá na aba **"Variables"** e adicione:

### Variáveis OBRIGATÓRIAS:
```
NODE_ENV=production
PORT=4000
DATABASE_URL=(cole do passo 2)
DB_HOST=(cole do passo 2)
DB_PORT=(cole do passo 2)
DB_USER=(cole do passo 2)
DB_PASSWORD=(cole do passo 2)
DB_NAME=(cole do passo 2)
DB_SSL=true
JWT_SECRET=(gere um segredo forte - min 32 caracteres)
FRONTEND_URL=(preencha depois do deploy do Vercel)
```

### Para gerar um JWT_SECRET seguro:
Acesse [random.org](https://www.random.org/strings/?num=1&len=40&digits=on&loweralpha=on&upperalpha=on&unique=on) e copie a string gerada.

### Variáveis OPCIONAIS (adicione depois se quiser):
```
OPENAI_API_KEY=sk-...
IA_PROVIDER=openai
IA_MODEL=gpt-4
REDIS_HOST=(adicione um Redis depois)
REDIS_PORT=6379
```

5. Railway vai automatically build e deploy
6. Aguarde o deploy completar (build + migration + start)
7. Copie a URL do backend (ex: `https://api-production-xxx.up.railway.app`)

---

## Passo 4: Verificar o Backend

Acesse:
```
https://SUA-URL.up.railway.app/api/v1/health
```

Deve retornar:
```json
{
  "status": "online",
  "database": { "status": "connected", "latencyMs": 5 }
}
```

Se retornar `"status": "degraded"`, verifique se as variáveis do banco estão corretas.

---

## Passo 5: Configurar o Frontend no Vercel

1. Acesse [vercel.com](https://vercel.com) e importe o repositório `psimariojunior/sola-scriptura-br`
2. Vercel vai detectar Next.js automaticamente
3. Nas configurações, adicione as variáveis de ambiente:

### Variáveis OBRIGATÓRIAS:
```
NEXT_PUBLIC_API_URL=https://SUA-URL.up.railway.app/api/v1
BACKEND_URL=https://SUA-URL.up.railway.app/api/v1
```

### Variáveis OPCIONAIS (para IA):
```
OPENROUTER_API_KEY=sua-chave
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-4o
```

4. Clique em **"Deploy"**
5. Aguarde o build completar
6. Copie a URL do Vercel (ex: `https://sola-scriptura-two.vercel.app`)

---

## Passo 6: Atualizar o Backend com a URL do Frontend

1. Volte ao Railway
2. No serviço do backend, vá em **"Variables"**
3. Atualize:
```
FRONTEND_URL=https://sua-url.vercel.app
```
4. Railway vai fazer redeploy automaticamente

---

## Passo 7: Verificar Tudo

1. Acesse `https://sua-url.vercel.app`
2. Teste o login/cadastro
3. Teste a leitura da Bíblia
4. Teste o assistente de IA (se configurou a chave)

---

## Troubleshooting

### Backend não sobe no Railway
- Verifique os logs em Railway → Logs
- Erro "JWT_SECRET é obrigatório": Adicione a variável JWT_SECRET
- Erro de conexão com banco: Verifique as variáveis DB_*

### Frontend não conecta ao backend
- Verifique se NEXT_PUBLIC_API_URL está correto
- Verifique se o backend retorna HTTP 200 no /health
- Verifique o CORS: FRONTEND_URL deve bater com a URL do Vercel

### Migration falha
- Railway executa `npm run migration:run` antes do deploy
- Se falhar, o deploy não acontece
- Verifique se DATABASE_URL ou DB_* estão configurados

### Health check retorna "degraded"
- O banco de dados não está acessível
- Verifique as credenciais do PostgreSQL
- Verifique se o SSL está habilitado (DB_SSL=true)
