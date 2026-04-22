#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[integration] starting mysql (docker compose)…"
docker compose -f docker-compose.integration.yml --env-file .env.integration down -v >/dev/null 2>&1 || true
docker compose -f docker-compose.integration.yml --env-file .env.integration up -d db

echo "[integration] waiting for mysql healthcheck…"
for i in {1..90}; do
  if docker exec -i multistore_mysql_integration sh -lc 'mysql -h127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1" >/dev/null 2>&1' \
    && docker exec -i multistore_mysql_integration sh -lc 'mysql -h127.0.0.1 -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "SELECT 1" >/dev/null 2>&1'; then
    break
  fi
  sleep 2
done

# Dar un pequeño margen para evitar race durante restart post-init
sleep 5

echo "[integration] running migrations + seeds…"
(
  set -a
  # shellcheck disable=SC1091
  source .env.integration
  set +a
  cd src
  npx sequelize-cli db:migrate --env test
  npx sequelize-cli db:seed:all --env test
)

echo "[integration] running jest integration suite…"
(
  set -a
  # shellcheck disable=SC1091
  source .env.integration
  set +a
  npx jest -c jest.integration.config.js
)

echo "[integration] done."

