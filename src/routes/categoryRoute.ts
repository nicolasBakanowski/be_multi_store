import express from "express";
import { Request, Response } from "express";
import Category from "../models/categoryModel";

const categoryRoute = express.Router();

categoryRoute.get("/new", async (req: Request, res: Response) => {
  try {
    let name = "ccccc";
    console.log("hola como va");
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("este es el error", error);
    res.status(500).json({ error: "Error dsds asdasdsa" });
  }
});

export default categoryRoute;
