import {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
} from "../repositories/productRepository";
import { ProductAttributes } from "../interfaces/productInterface";
async function createProductService(productData: ProductAttributes) {
  try {
    const newProduct = await createProductInDB(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product");
  }
}

async function getAllProductsService() {
  try {
    const products = await getAllProductsFromDB();
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
}

async function getProductByIdService(productId: number) {
  try {
    const product = await getProductByIdFromDB(productId);
    return product;
  } catch (error) {
    throw new Error("Error fetching product by ID");
  }
}

export { createProductService, getAllProductsService, getProductByIdService };
