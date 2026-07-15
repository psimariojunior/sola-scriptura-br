#!/bin/bash

# Sola Scriptura BR - Setup Inicial da VM Oracle
# Execute este script uma vez na VM nova

set -e

echo "🔧 Setup inicial da VM Oracle para Sola Scriptura BR..."

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar dependências
echo "📦 Instalando dependências..."
sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    ufw \
    fail2ban \
    htop \
    nano

# Instalar Docker
echo "🐳 Instalando Docker..."
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
echo "🐳 Instalando Docker Compose..."
sudo apt install docker-compose -y

# Configurar firewall
echo "🔥 Configurando firewall..."
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# Configurar Fail2Ban
echo "🔒 Configurando Fail2Ban..."
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Criar diretório de deploy
echo "📁 Criando diretório de deploy..."
sudo mkdir -p /opt/sola-scriptura
sudo chown $USER:$USER /opt/sola-scriptura

# Configurar swap (recomendado para VMs com pouca RAM)
echo "💾 Configurando swap..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

echo -e "${GREEN}✅ Setup concluído!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "1. Faça logout e login novamente para Docker funcionar"
echo "2. Clone o repositório: git clone <repo-url> /opt/sola-scriptura"
echo "3. Execute: cd /opt/sola-scriptura/backend/docker && ./deploy.sh"
echo ""
echo "⚠️  IMPORTANTE:"
echo "- O IP desta VM é: $(curl -s ifconfig.me)"
echo "- Configure este IP no DNS do domínio"
echo "- Configure as variáveis de ambiente no .env"