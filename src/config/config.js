require("dotenv").config();

const base = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.DB_HOST || "db",
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  dialect: "mysql",
};

module.exports = {
  development: base,
  test: base,
  production: base,
};
