import { Request, Response } from "express";
import {
  authGoogleService,
  loginUserService,
  registerUserService,
} from "../services/userService";
import { UserAttributes } from "../interfaces/userInterface";
import { getEnv } from "../config/env";
import { OAuth2Client } from "google-auth-library";
import type User from "../models/userModel";

const googleClient = new OAuth2Client();

function publicUser(u: User) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    roleId: u.roleId,
    googleId: u.googleId ?? null,
  };
}

async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    if (result) {
      res.status(200).json({
        token: result.token,
        user: publicUser(result.user),
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch {
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
    res.status(201).json(publicUser(newUser));
  } catch {
    res.status(500).json({ error: "Error registering user" });
  }
}

async function authGoogleController(req: Request, res: Response) {
  try {
    const env = getEnv();
    let email: string;
    let name: string;
    let googleId: string;

    if (env.GOOGLE_CLIENT_ID) {
      const credential = req.body.credential as string | undefined;
      if (!credential) {
        return res
          .status(400)
          .json({ error: "Se requiere credential (JWT de Google Sign-In)" });
      }
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: env.GOOGLE_CLIENT_ID,
      });
      const pl = ticket.getPayload();
      if (!pl?.email || !pl.sub) {
        return res.status(401).json({ error: "Token de Google inválido" });
      }
      email = pl.email;
      name = pl.name || "Usuario";
      googleId = pl.sub;
    } else {
      email = req.body.email as string;
      name = req.body.name as string;
      googleId = (req.body.googleId as string) || `legacy:${email}`;
      if (!email || !name) {
        return res.status(400).json({
          error:
            "Sin GOOGLE_CLIENT_ID: envía email, name y opcionalmente googleId",
        });
      }
    }

    const { user, token } = await authGoogleService({ email, name, googleId });
    res.status(200).json({ user: publicUser(user), token });
  } catch {
    res.status(500).json({ error: "Error en autenticación Google" });
  }
}

export { registerUserController, loginController, authGoogleController };
