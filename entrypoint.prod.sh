#!/bin/sh
set -e

echo "Esperando a que MySQL esté listo..."
until node -e "
const h=process.env.DB_HOST||process.env.MYSQL_HOST||'db';
const u=process.env.MYSQL_USER;
const p=process.env.MYSQL_PASSWORD;
require('mysql2').createConnection({host:h,user:u,password:p}).connect(e=>process.exit(e?1:0));
" 2>/dev/null; do
  sleep 2
done

echo "Iniciando API (producción)..."
exec node dist/app.js
