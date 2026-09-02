#!/usr/bin/env bash
# Instala e sobe coturn na Oracle VM. Senha em /opt/sola-scriptura/turn.secret (não no git).
set -euo pipefail

EXTERNAL_IP="${EXTERNAL_IP:-137.131.184.53}"
REALM="${REALM:-solascripturabr.com.br}"
TURN_USER="${TURN_USER:-ssb}"
SECRET_FILE="${SECRET_FILE:-/opt/sola-scriptura/turn.secret}"
MIN_PORT=49152
MAX_PORT=49200

sudo mkdir -p /opt/sola-scriptura
if [[ ! -f "$SECRET_FILE" ]]; then
  openssl rand -base64 24 | tr -d '\n' | sudo tee "$SECRET_FILE" >/dev/null
  sudo chmod 600 "$SECRET_FILE"
fi
TURN_PASS="$(sudo cat "$SECRET_FILE")"

sudo apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y coturn

sudo tee /etc/turnserver.conf >/dev/null <<EOF
listening-port=3478
tls-listening-port=5349
fingerprint
lt-cred-mech
realm=${REALM}
user=${TURN_USER}:${TURN_PASS}
no-cli
no-multicast-peers
stale-nonce=600
listening-ip=0.0.0.0
external-ip=${EXTERNAL_IP}
min-port=${MIN_PORT}
max-port=${MAX_PORT}
no-tls
no-dtls
EOF

if [[ -f /etc/default/coturn ]]; then
  sudo sed -i 's/^#*TURNSERVER_ENABLED=.*/TURNSERVER_ENABLED=1/' /etc/default/coturn
  if ! grep -q '^TURNSERVER_ENABLED=' /etc/default/coturn; then
    echo 'TURNSERVER_ENABLED=1' | sudo tee -a /etc/default/coturn >/dev/null
  fi
fi

if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow 3478/tcp
  sudo ufw allow 3478/udp
  sudo ufw allow 5349/tcp
  sudo ufw allow 5349/udp
  sudo ufw allow ${MIN_PORT}:${MAX_PORT}/udp
fi

sudo systemctl enable coturn
sudo systemctl restart coturn
sudo systemctl --no-pager --full status coturn || true

echo "TURN_URL=turn:${EXTERNAL_IP}:3478"
echo "TURN_USER=${TURN_USER}"
echo "TURN_PASS_FILE=${SECRET_FILE}"
