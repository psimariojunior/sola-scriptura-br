#!/bin/bash

# Sola Scriptura BR - Script de Deploy para Oracle VM
# Execute este script na VM após o primeiro setup

set -e

echo "🚀 Iniciando deploy do Sola Scriptura BR Backend..."

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker não encontrado. Instalando...${NC}"
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}Docker instalado! Faça logout e login novamente.${NC}"
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose não encontrado. Instalando...${NC}"
    sudo apt install docker-compose -y
fi

# Criar diretório de deploy
DEPLOY_DIR="/opt/sola-scriptura"
sudo mkdir -p $DEPLOY_DIR
sudo chown $USER:$USER $DEPLOY_DIR

# Copiar arquivos
echo "📁 Copiando arquivos..."
cp -r . $DEPLOY_DIR/

# Verificar se .env existe
if [ ! -f "$DEPLOY_DIR/.env" ]; then
    echo -e "${YELLOW}Arquivo .env não encontrado. Criando a partir do modelo...${NC}"
    cp .env.production $DEPLOY_DIR/.env
    echo -e "${RED}⚠️  EDITE O ARQUIVO .env COM SUAS CREDENCIAIS!${NC}"
    echo -e "${RED}   nano $DEPLOY_DIR/.env${NC}"
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
cd $DEPLOY_DIR
docker-compose down

# Build e subir containers
echo "🔨 Fazendo build e subindo containers..."
docker-compose up -d --build

# Aguardar backend iniciar
echo "⏳ Aguardando backend iniciar..."
sleep 10

# Verificar saúde
echo "🏥 Verificando saúde do backend..."
if curl -f http://localhost:4000/api/v1/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend rodando com sucesso!${NC}"
else
    echo -e "${RED}❌ Backend com problemas. Verifique logs:${NC}"
    docker-compose logs backend
    exit 1
fi

# Configurar SSL (primeira vez)
echo "🔒 Configurando SSL..."
DOMAIN="solascripturabr.com"
EMAIL="seu-email@gmail.com"  # MUDE ESTE EMAIL

# Verificar se SSL já existe
if [ ! -d "$DEPLOY_DIR/nginx/ssl/live/$DOMAIN" ]; then
    echo "Obtendo certificado SSL..."
    docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        -d $DOMAIN \
        -d www.$DOMAIN \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email
fi

# Reiniciar nginx com SSL
docker-compose restart nginx

echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o DNS do domínio para apontar para este IP"
echo "2. Configure GitHub Actions para auto-deploy"
echo "3. Acesse: https://$DOMAIN/api/docs"
echo ""
echo "📊 Comandos úteis:"
echo "  docker-compose logs -f backend    # Ver logs"
echo "  docker-compose restart backend    # Reiniciar backend"
echo "  docker-compose down               # Parar tudo"
echo "  docker-compose up -d              # Subir tudo"