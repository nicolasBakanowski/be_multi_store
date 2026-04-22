import User from "../models/userModel";
import { UserAttributes } from "../interfaces/userInterface";
import { Op } from "sequelize";

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

async function listUsersFromDB(params: {
  q?: string;
  limit: number;
  offset: number;
}) {
  const { q, limit, offset } = params;
  try {
    const where = q
      ? {
          [Op.or]: [
            { email: { [Op.like]: `%${q}%` } },
            { name: { [Op.like]: `%${q}%` } },
          ],
        }
      : undefined;

    return await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
      attributes: ["id", "name", "email", "roleId", "googleId", "createdAt"],
    });
  } catch {
    throw new Error("Error listing users");
  }
}

async function updateUserRoleInDB(userId: number, roleId: number) {
  try {
    const user = await User.findByPk(userId);
    if (!user) return null;
    user.roleId = roleId;
    await user.save();
    return user;
  } catch {
    throw new Error("Error updating user role");
  }
}

async function deleteUserFromDB(userId: number) {
  try {
    return await User.destroy({ where: { id: userId } });
  } catch {
    throw new Error("Error deleting user");
  }
}

export {
  createUserInDB,
  getUserByIdFromDB,
  findUserByEmail,
  findUserByGoogleId,
  listUsersFromDB,
  updateUserRoleInDB,
  deleteUserFromDB,
};
