#!/bin/bash
LOG=/var/log/backend-watchdog.log
CONTAINER=sola-scriptura-backend
COMPOSE_DIR=/opt/sola-scriptura/backend/docker

STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER 2>/dev/null)

if [ "$STATUS" != "running" ]; then
  echo "$(date): Container status=$STATUS, restarting..." >> $LOG
  cd $COMPOSE_DIR && docker compose up -d backend >> $LOG 2>&1
  sleep 15
  NEW_STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER 2>/dev/null)
  echo "$(date): After restart status=$NEW_STATUS" >> $LOG
fi

HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4000/api/v1/health 2>/dev/null)
if [ "$HTTP_CODE" != "200" ] && [ "$STATUS" = "running" ]; then
  echo "$(date): Health check failed HTTP $HTTP_CODE, restarting..." >> $LOG
  cd $COMPOSE_DIR && docker compose restart backend >> $LOG 2>&1
fi
