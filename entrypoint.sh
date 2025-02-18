#!/bin/sh

echo "Esperando a que MySQL esté listo..."
until node -e "require('mysql2').createConnection({host: 'db', user: 'myuser', password: 'mypassword'}).connect((err) => process.exit(err ? 1 : 0))"; do
  sleep 2
done

echo "MySQL está listo. Compilando TypeScript..."
npm run build

echo "Ejecutando migraciones..."
cd src
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
echo "Intentando conectar a MySQL con usuario: $DB_USER y host: $DB_HOST"
echo "Iniciando aplicación..."
npm start
