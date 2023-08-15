import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import {
  UserAttributes,
  UserCreationAttributes,
} from "../interfaces/userInterface"; // Importa las interfaces

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public googleId?: string | null;
  public phone?: string | null;
  public roleId?: number | null;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
