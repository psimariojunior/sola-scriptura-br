#!/bin/bash
# Database backup script for Sola Scriptura BR
# Run daily via cron: 0 2 * * * /opt/sola-scriptura/backend/scripts/backup-database.sh

BACKUP_DIR="/opt/sola-scriptura/backups"
DATE=$(date +%Y%m%d_%H%M%S)
CONTAINER_NAME="sola-scriptura-postgres"

mkdir -p $BACKUP_DIR

docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME | gzip > "$BACKUP_DIR/backup_$DATE.sql.gz"

# Keep last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
