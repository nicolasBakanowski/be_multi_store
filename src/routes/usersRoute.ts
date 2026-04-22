import express from "express";
import {
  loginController,
  registerUserController,
  authGoogleController,
} from "../controllers/userControllers";
import {
  deleteUserController,
  listUsersController,
  updateUserRoleController,
} from "../controllers/adminUserControllers";
import { validateBody } from "../middleware/validateRequest";
import {
  loginBodySchema,
  registerBodySchema,
} from "../schemas/userBodySchemas";
import { authRouteLimiter } from "../config/rateLimit";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdminMiddleware } from "../middleware/isSuperAdminMiddleware";
import { updateUserRoleBodySchema } from "../schemas/adminUserSchemas";

const userRoute = express.Router();

userRoute.post(
  "/login",
  authRouteLimiter,
  validateBody(loginBodySchema),
  loginController
);
userRoute.post(
  "/register",
  authRouteLimiter,
  validateBody(registerBodySchema),
  registerUserController
);
userRoute.post("/authGoogle", authRouteLimiter, authGoogleController);

// SUPERADMIN user management
userRoute.get(
  "/admin/users",
  authMiddleware,
  isSuperAdminMiddleware,
  listUsersController
);
userRoute.patch(
  "/admin/users/:id/role",
  authMiddleware,
  isSuperAdminMiddleware,
  validateBody(updateUserRoleBodySchema),
  updateUserRoleController
);
userRoute.delete(
  "/admin/users/:id",
  authMiddleware,
  isSuperAdminMiddleware,
  deleteUserController
);

export default userRoute;
