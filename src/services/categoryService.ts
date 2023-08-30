import {
  createCategoryInDB,
  getAllCategoriesFromDB,
} from "../repositories/categoryRepository";

async function createCategoryService(name: string, imageUrl: string) {
  try {
    const newCategory = await createCategoryInDB({ name, imageUrl });
    return newCategory;
  } catch (error) {
    throw new Error("Error creating category");
  }
}

async function getAllCategoriesService() {
  try {
    const categories = await getAllCategoriesFromDB();
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}

export { createCategoryService, getAllCategoriesService };
