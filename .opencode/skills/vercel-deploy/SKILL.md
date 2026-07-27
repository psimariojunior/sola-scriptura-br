# Skill: Deploy no Vercel

## Quando usar
Quando o usuario pedir para fazer deploy, subir, publicar ou enviar mudancas para o Vercel.

## Passos obrigatorios

### 1. Verificar mudancas pendentes
```powershell
cd "C:\Sola Scriptura BR"; git status
```

### 2. Fazer commit das mudancas
```powershell
cd "C:\Sola Scriptura BR"; git add -A; git commit -m "descrever mudancas"
```

### 3. Push para o GitHub
```powershell
cd "C:\Sola Scriptura BR"; git push origin main
```

### 4. Deploy no Vercel (producao)
```powershell
cd "C:\Sola Scriptura BR"; vercel --prod --yes
```

## Regras
- SEMPRE fazer commit e push ANTES do deploy
- O deploy e automatico via GitHub, mas o `vercel --prod` garante deploy imediato
- Se houver erros de build, corrigir antes de fazer deploy
- Verificar se o deploy foi bem sucedido no output do comando

## Credenciais
- O Vercel CLI ja esta autenticado na maquina
- O projeto esta vinculado ao repositorio GitHub
- URL do site: https://solascripturabr.com.br
