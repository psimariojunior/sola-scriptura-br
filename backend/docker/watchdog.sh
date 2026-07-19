#!/bin/bash
# Watchdog: reinicia o container backend se estiver parado
CONTAINER="sola-scriptura-backend"
LOG="/var/log/sola-watchdog.log"

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Container $CONTAINER parado. Reiniciando..." >> "$LOG"
    cd /opt/sola-scriptura/backend/docker && docker compose up -d backend 2>> "$LOG"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Container reiniciado." >> "$LOG"
fi
