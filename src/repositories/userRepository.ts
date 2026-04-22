import User from "../models/userModel";
import { UserAttributes } from "../interfaces/userInterface";

async function createUserInDB(userData: UserAttributes) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user in the database");
  }
}

async function getUserByIdFromDB(userId: number) {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID from the database");
  }
}
async function findUserByEmail(email: string) {
  try {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
}

async function findUserByGoogleId(googleId: string) {
  try {
    return await User.findOne({ where: { googleId } });
  } catch {
    throw new Error("Error fetching user by googleId");
  }
}

export { createUserInDB, getUserByIdFromDB, findUserByEmail, findUserByGoogleId };
