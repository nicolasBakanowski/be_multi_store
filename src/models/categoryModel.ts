import { Model, DataTypes } from "sequelize";
import sequelize from "../db"; // Asegúrate de importar tu instancia de Sequelize correctamente

class Category extends Model {
  public id!: number;
  public name!: string;

  // Otras propiedades y métodos del modelo
}

Category.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Category",
  }
);

export default Category;
