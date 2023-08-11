import Category from "../models/categoryModel";

async function createCategoryInDB(categoryData: { name: string }) {
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

export { createCategoryInDB, getAllCategoriesFromDB };
