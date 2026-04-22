#!/bin/sh
set -e

MYSQL_USER_VAL="${MYSQL_USER:-multistore}"
MYSQL_PASSWORD_VAL="${MYSQL_PASSWORD:-multistore}"
DB_HOST_VAL="${DB_HOST:-db}"

echo "Esperando a que MySQL esté listo en ${DB_HOST_VAL}..."
until node -e "
const h='${DB_HOST_VAL}';
const u='${MYSQL_USER_VAL}';
const p='${MYSQL_PASSWORD_VAL}';
require('mysql2').createConnection({ host: h, user: u, password: p }).connect((err) => process.exit(err ? 1 : 0));
" 2>/dev/null; do
  sleep 2
done

echo "Instalando dependencias..."
npm install

echo "MySQL está listo. Compilando TypeScript..."
npm run build

echo "Ejecutando migraciones..."
cd src
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
cd ..

echo "Iniciando aplicación..."
npm start
