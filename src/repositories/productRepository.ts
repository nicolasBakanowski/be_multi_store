import Product from "../models/productModel";
import { ProductAttributes,ProductEdit } from "../interfaces/productInterface";

async function createProductInDB(productData: ProductAttributes) {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product in the database");
  }
}

async function getAllProductsFromDB() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error("Error fetching products from the database");
  }
}

async function getProductByIdFromDB(productId: number) {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    throw new Error("Error fetching product by ID from the database");
  }
}
async function getProductsByCategoryFromDB(categoryId: number) {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        categoryId: categoryId,
      },
    });
    return products;
  } catch (error) {
    throw new Error("Error fetching products by category from the database");
  }
}
async function editProductInDB(productId: number, updatedProductData: ProductEdit) {
  try {
    const [updatedRowsCount, updatedRows] = await Product.update(updatedProductData, {
      where: { id: productId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      throw new Error("Product not found");
    }
    const product = await getProductByIdFromDB(productId)
    return product; 
  } catch (error) {
    throw new Error("Error editing product in the database");
  }
}
export {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  getProductsByCategoryFromDB,
  editProductInDB
};
