import express from "express";
import {
  loginController,
  registerUserController,
  authGoogleController,
} from "../controllers/userControllers";
const userRoute = express.Router();

userRoute.post("/login", loginController);
userRoute.post("/register", registerUserController);
userRoute.post("/authGoogle", authGoogleController);


export default userRoute;
