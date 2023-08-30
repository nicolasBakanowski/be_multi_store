import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/userService";
import { UserAttributes } from "../interfaces/userInterface";
async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginUserService(email, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
}

async function registerUserController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const userData: UserAttributes = {
      id: 0,
      name,
      email,
      password,
      roleId: 2,
    };

    const newUser = await registerUserService(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
}

export { registerUserController, loginController };
