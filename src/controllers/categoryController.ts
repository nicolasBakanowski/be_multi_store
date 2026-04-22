import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/categoryService";
import {
  deleteEntityImageFolder,
  entityImagePublicUrl,
  saveEntityImageFromBuffer,
} from "../helpers/imageService";

async function createCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Category image is required" });
    }

    const newCategory = await createCategoryService(name, "pending");

    await saveEntityImageFromBuffer({
      entityType: "category",
      entityId: newCategory.id,
      buffer: req.file.buffer,
    });

    const imageUrl = entityImagePublicUrl(req, "category", newCategory.id);
    const updatedCategory = await updateCategoryService(newCategory.id, {
      imageUrl,
    });

    return res.status(201).json(updatedCategory);
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

async function editCategoryController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id, 10);
    if (!categoryId) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const existing = await getCategoryByIdService(categoryId);
    if (!existing) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (req.file?.buffer) {
      await saveEntityImageFromBuffer({
        entityType: "category",
        entityId: categoryId,
        buffer: req.file.buffer,
      });
      const imageUrl = entityImagePublicUrl(req, "category", categoryId);
      const updated = await updateCategoryService(categoryId, {
        name: req.body?.name,
        imageUrl,
      });
      return res.status(200).json(updated);
    }

    const updated = await updateCategoryService(categoryId, {
      name: req.body?.name,
    });
    return res.status(200).json(updated);
  } catch {
    return res.status(500).json({ error: "Error editing category" });
  }
}

async function deleteCategoryController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const existing = await getCategoryByIdService(categoryId);
    if (!existing) {
      return res.status(404).json({ error: "Category not found" });
    }

    await deleteEntityImageFolder({ entityType: "category", entityId: categoryId });
    await deleteCategoryService(categoryId);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Error deleting category" });
  }
}

export {
  createCategoryController,
  getAllCategoriesController,
  editCategoryController,
  deleteCategoryController,
};
