require("dotenv").config();

const base = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.DB_HOST || "db",
  dialect: "mysql",
};

module.exports = {
  development: base,
  test: base,
  production: base,
};
