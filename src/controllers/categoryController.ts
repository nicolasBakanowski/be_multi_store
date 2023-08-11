import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
} from "../services/categoryService";

async function createCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newCategory = await createCategoryService(name);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("este es el error", error);
    res.status(500).json({ error: "Error creating category" });
  }
}
async function getAllCategoriesController(req: Request, res: Response) {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    console.log("este es el error", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
}
export { createCategoryController, getAllCategoriesController };
