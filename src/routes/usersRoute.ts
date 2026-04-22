import express from "express";
import {
  loginController,
  registerUserController,
  authGoogleController,
} from "../controllers/userControllers";
import { validateBody } from "../middleware/validateRequest";
import {
  loginBodySchema,
  registerBodySchema,
} from "../schemas/userBodySchemas";
import { authRouteLimiter } from "../config/rateLimit";

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

export default userRoute;
