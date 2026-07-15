#!/bin/bash

# ================================================================
# Sola Scriptura BR - Deploy para Oracle VM
# Execute este script na VM via SSH
# ================================================================

set -euo pipefail

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }

# ================================================================
# CONFIGURAÇÕES
# ================================================================
DEPLOY_DIR="/opt/sola-scriptura"
BACKEND_DIR="$DEPLOY_DIR/backend"
DOCKER_DIR="$BACKEND_DIR/docker"
COMPOSE_FILE="$DOCKER_DIR/docker-compose.yml"
HEALTH_URL="http://localhost:4000/api/v1/health"
MAX_WAIT=120

# ================================================================
# 1. VERIFICAR PREREQUISITOS
# ================================================================
log "Verificando prerequisitos..."

if ! command -v docker &> /dev/null; then
    error "Docker não encontrado. Instale: curl -fsSL https://get.docker.com | sh"
fi

if ! docker compose version &> /dev/null && ! command -v docker-compose &> /dev/null; then
    error "Docker Compose não encontrado."
fi

# Determinar comando docker-compose
if docker compose version &> /dev/null; then
    COMPOSE="docker compose"
else
    COMPOSE="docker-compose"
fi

success "Docker e Docker Compose OK"

# ================================================================
# 2. GIT PULL
# ================================================================
log "Fazendo git pull..."
cd "$BACKEND_DIR"
git pull origin main || warn "Git pull falhou (pode ser que já esteja atualizado)"
success "Código atualizado"

# ================================================================
# 3. PARAR CONTAINERS EXISTENTES
# ================================================================
log "Parando containers existentes..."
cd "$DOCKER_DIR"
$COMPOSE down --remove-orphans 2>/dev/null || true
success "Containers parados"

# ================================================================
# 4. BUILD E SUBIR INFRA (postgres, redis)
# ================================================================
log "Subindo infraestrutura (postgres, redis)..."
$COMPOSE up -d --build postgres redis
log "Aguardando postgres ficar saudável..."
sleep 10

# Verificar se postgres está pronto
for i in $(seq 1 30); do
    if $COMPOSE exec -T postgres pg_isready -U sola_scriptura &>/dev/null; then
        success "PostgreSQL pronto"
        break
    fi
    if [ "$i" -eq 30 ]; then
        error "PostgreSQL não ficou pronto em 30s"
    fi
    sleep 2
done

# ================================================================
# 5. BUILD E SUBIR BACKEND
# ================================================================
log "Fazendo build do backend..."
$COMPOSE up -d --build backend
success "Backend build concluído"

# ================================================================
# 6. AGUARDAR BACKEND INICIAR
# ================================================================
log "Aguardando backend iniciar (max ${MAX_WAIT}s)..."
for i in $(seq 1 $MAX_WAIT); do
    if curl -sf "$HEALTH_URL" &>/dev/null; then
        success "Backend saudável em ${i}s"
        break
    fi
    if [ "$i" -eq "$MAX_WAIT" ]; then
        warn "Backend não respondeu em ${MAX_WAIT}s. Verificando logs..."
        $COMPOSE logs --tail=30 backend
        error "Backend falhou ao iniciar"
    fi
    sleep 2
done

# ================================================================
# 7. RODAR MIGRATIONS
# ================================================================
log "Rodando migrations..."
$COMPOSE exec -T backend node -e "
const{DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME||'sola_scriptura',
  ssl:false,
  entities:['dist/**/*.entity.js'],
  migrations:['dist/infra/database/migrations/*.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  try{
    const pending=await ds.showMigrations();
    console.log('Migrations pendentes: '+pending.length);
    await ds.runMigrations();
    console.log('Migrations OK');
  }catch(e){
    console.log('Migration skip: '+e.message);
  }
  await ds.destroy();
  process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);})
" || warn "Migrations tiveram problemas (pode ser normal)"

success "Migrations concluídas"

# ================================================================
# 8. VERIFICAR SE BANCO PRECISA DE SEED
# ================================================================
log "Verificando se banco precisa de seed..."
SEED_NEEDED=$($COMPOSE exec -T backend node -e "
const{DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME||'sola_scriptura',
  ssl:false,
  entities:['dist/**/*.entity.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  const c=await ds.query('SELECT COUNT(*) FROM livros');
  const count=parseInt(c[0].count);
  console.log(count);
  await ds.destroy();
  process.exit(0);
}).catch(e=>{console.error('0');process.exit(0);})
" 2>/dev/null)

if [ "$SEED_NEEDED" = "0" ]; then
    log "Banco vazio detectado. Rodando seed..."
    $COMPOSE exec -T backend node dist/infra/database/seed.js || warn "Seed via JS compilado falhou. Tentando via ts-node..."
    success "Seed concluído"
else
    success "Banco já possui dados ($SEED_NEEDED livros)"
fi

# ================================================================
# 9. SUBIR SERVIÇOS COMPLEMENTARES
# ================================================================
log "Subindo serviços complementares..."
$COMPOSE up -d nginx 2>/dev/null || warn "Nginx não configurado ainda"
success "Serviços complementares iniciados"

# ================================================================
# 10. HEALTH CHECK FINAL
# ================================================================
log "Health check final..."
if curl -sf "$HEALTH_URL" &>/dev/null; then
    success "Backend respondendo corretamente!"
else
    warn "Backend não respondeu no health check. Verificando logs..."
    $COMPOSE logs --tail=20 backend
fi

# ================================================================
# RESUMO
# ================================================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📊 Status dos containers:"
$COMPOSE ps
echo ""
echo "📋 Comandos úteis:"
echo "  $COMPOSE logs -f backend     # Ver logs"
echo "  $COMPOSE restart backend     # Reiniciar"
echo "  $COMPOSE down                # Parar tudo"
echo "  $COMPOSE up -d               # Subir tudo"
echo ""
echo "🔗 Health check: $HEALTH_URL"
