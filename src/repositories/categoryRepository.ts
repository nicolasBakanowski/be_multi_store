import Category from "../models/categoryModel";

async function createCategoryInDB(categoryData: {
  name: string;
  imageUrl: string;
}) {
  try {
    const newCategory = await Category.create(categoryData);
    return newCategory;
  } catch (error) {
    throw new Error("Error creating category in the database");
  }
}

async function getAllCategoriesFromDB() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories from the database");
  }
}

async function updateCategoryInDB(
  categoryId: number,
  updatedCategoryData: Partial<{ name: string; imageUrl: string }>
) {
  try {
    const [updatedRowsCount] = await Category.update(updatedCategoryData, {
      where: { id: categoryId },
    });
    if (updatedRowsCount === 0) {
      throw new Error("Category not found");
    }
    return await Category.findByPk(categoryId);
  } catch (error) {
    throw new Error("Error editing category in the database");
  }
}

async function getCategoryByIdFromDB(categoryId: number) {
  try {
    return await Category.findByPk(categoryId);
  } catch {
    throw new Error("Error fetching category by ID from the database");
  }
}

async function deleteCategoryInDB(categoryId: number) {
  try {
    return await Category.destroy({ where: { id: categoryId } });
  } catch {
    throw new Error("Error deleting category in the database");
  }
}

export {
  createCategoryInDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  getCategoryByIdFromDB,
  deleteCategoryInDB,
};
