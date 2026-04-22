import {
  createCategoryInDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  getCategoryByIdFromDB,
  deleteCategoryInDB,
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

async function updateCategoryService(
  categoryId: number,
  updatedCategoryData: Partial<{ name: string; imageUrl: string }>
) {
  try {
    return await updateCategoryInDB(categoryId, updatedCategoryData);
  } catch {
    throw new Error("Error editing category");
  }
}

async function getCategoryByIdService(categoryId: number) {
  try {
    return await getCategoryByIdFromDB(categoryId);
  } catch {
    throw new Error("Error fetching category by ID");
  }
}

async function deleteCategoryService(categoryId: number) {
  try {
    return await deleteCategoryInDB(categoryId);
  } catch {
    throw new Error("Error deleting category");
  }
}

export {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  getCategoryByIdService,
  deleteCategoryService,
};
