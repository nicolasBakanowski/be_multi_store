import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  nombre: string;
  email: string;
  password: string;
  googleId?: string | null;
  telefono?: string | null;
  roleId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export { UserAttributes, UserCreationAttributes };
