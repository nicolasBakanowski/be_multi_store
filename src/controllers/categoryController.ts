import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
} from "../services/categoryService";

async function createCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/dist/uploads/category/${
        req.file.originalname
      }`;
    }
    console.info("este es la imageUrl", imageUrl);
    let newCategory;
    if (imageUrl) {
      newCategory = await createCategoryService(name, imageUrl);
    }
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the category" });
  }
}

async function getAllCategoriesController(req: Request, res: Response) {
  try {
    const categories = await getAllCategoriesService();
    const formattedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
    }));
    res.status(200).json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
}
export { createCategoryController, getAllCategoriesController };
