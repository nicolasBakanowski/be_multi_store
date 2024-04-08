import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 
const { MYSQL_URL } = process.env;

if (!MYSQL_URL) {
  throw new Error("La variable de entorno MYSQL_URL no está definida.");
}

const sequelize = new Sequelize(MYSQL_URL, {
  dialect: "mysql",
});

export default sequelize;
