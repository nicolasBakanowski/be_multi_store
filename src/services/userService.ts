import { comparePasswords, hashPassword } from "../helpers/hashPassword";
import { generateToken } from "../helpers/tokenManager";
import { UserAttributes } from "../interfaces/userInterface";
import {
  createUserInDB,
  findUserByEmail,
} from "../repositories/userRepository";
import { TokenPayload } from "../interfaces/tokenPayload";
async function loginUserService(
  email: string,
  password: string
): Promise<string | null> {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const tokenPayload: TokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      // Otros campos del usuario que quieras incluir en el token
    };
    const token = generateToken(tokenPayload);

    return token;
  } catch (error) {
    throw new Error("Error during login");
  }
}

async function registerUserService(userData: UserAttributes) {
  try {
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await hashPassword(userData.password);
    const userWithHashedPassword = { ...userData, password: hashedPassword };
    const newUser = await createUserInDB(userWithHashedPassword);

    return newUser;
  } catch (error) {
    throw new Error("Error registering user");
  }
}

export { registerUserService, loginUserService };
