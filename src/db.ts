import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mydb", "myuser", "mypassword", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default sequelize;
