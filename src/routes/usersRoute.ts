import express from "express";
import {
  loginController,
  registerUserController,
} from "../controllers/userControllers";
const userRoute = express.Router();

userRoute.post("/login", loginController);
userRoute.post("/register", registerUserController);

export default userRoute;
