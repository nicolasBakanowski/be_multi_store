import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  googleId?: string | null;
  phone?: string | null;
  roleId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export { UserAttributes, UserCreationAttributes };
