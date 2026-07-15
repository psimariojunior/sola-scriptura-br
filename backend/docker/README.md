# Deploy Backend - Oracle VM

## Pré-requisitos
- VM Oracle Cloud (Ubuntu 22.04+)
- Domínio apontando para o IP da VM
- Chave SSH configurada

## Setup Inicial da VM

```bash
# Conectar na VM
ssh -i sua-chave.pem ubuntu@IP_DA_VM

# Baixar e executar script de setup
curl -sL https://raw.githubusercontent.com/seu-usuario/sola-scriptura/main/backend/docker/setup-vm.sh | bash
```

## Configuração

1. **Editar variáveis de ambiente:**
```bash
nano /opt/sola-scriptura/.env
```

Variáveis obrigatórias:
- `DB_PASSWORD` - Senha do PostgreSQL
- `REDIS_PASSWORD` - Senha do Redis
- `JWT_SECRET` - Chave aleatória (64 caracteres)
- `OPENAI_API_KEY` - Chave da OpenAI
- `GOOGLE_CLIENT_ID` - Client ID do Google OAuth
- `GOOGLE_CLIENT_SECRET` - Client Secret do Google OAuth
- `ENCRYPTION_KEY` - Chave de criptografia (32 caracteres)

2. **Configurar DNS:**
   - Aponte `A Record` para o IP da VM
   - Aponte `CNAME` (www) para o domínio principal

3. **Deploy:**
```bash
cd /opt/sola-scriptura/backend/docker
./deploy.sh
```

## GitHub Actions (Auto-Deploy)

Configure os seguintes secrets no repositório GitHub:

| Secret | Descrição |
|--------|-----------|
| `Oracle_VM_IP` | IP da VM Oracle |
| `Oracle_VM_USER` | Usuário da VM (geralmente `ubuntu`) |
| `SSH_PRIVATE_KEY` | Chave SSH privada |
| `DOMAIN` | Domínio do site |

### Gerar chave SSH para deploy:
```bash
# Na sua máquina local
ssh-keygen -t ed25519 -f deploy_key -N ""

# Copiar chave pública para VM
ssh-copy-id -i deploy_key.pub ubuntu@IP_DA_VM

# Copiar chave privada para o GitHub Secrets
cat deploy_key
```

## Comandos Úteis

```bash
# Ver logs
docker-compose logs -f backend

# Reiniciar backend
docker-compose restart backend

# Parar tudo
docker-compose down

# Subir tudo
docker-compose up -d

# Ver status
docker-compose ps

# Atualizar SSL
docker-compose run --rm certbot renew
```

## Estrutura

```
/opt/sola-scriptura/
├── backend/           # Código fonte do backend
├── docker/            # Configurações Docker
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx/
│   │   └── nginx.conf
│   ├── deploy.sh
│   └── setup-vm.sh
├── .env               # Variáveis de ambiente
└── nginx/
    └── ssl/           # Certificados SSL
```

## Troubleshooting

### Backend não inicia
```bash
docker-compose logs backend
```

### SSL não funciona
```bash
docker-compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d solascripturabr.com \
  -d www.solascripturabr.com \
  -e seu-email@gmail.com
```

### PostgreSQL com problemas
```bash
docker-compose restart postgres
docker-compose logs postgres
```

## Custos Oracle Cloud Free Tier

- **VM.Standard.A1.Flex** (ARM): 4 OCPU, 24GB RAM (grátis)
- **2 volumes de boot**: 200GB total (grátis)
- **2 bancos de dados**: 20GB total (grátis)
- **Tráfego de rede**: 10TB/mês (grátis)

**Total: $0/mês** ✅