import Product from "../models/productModel";
import { ProductAttributes } from "../interfaces/productInterface";

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

export { createProductInDB, getAllProductsFromDB, getProductByIdFromDB };
