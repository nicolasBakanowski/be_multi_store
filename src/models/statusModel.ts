import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Status extends Model {
  public id!: number;
  public name!: string;
}

Status.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Status",
  }
);

export default Status;
