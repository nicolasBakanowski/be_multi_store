import {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  getProductsByCategoryFromDB,
  editProductInDB,
  toggleProductStatusInDB,
  getAllDisabledProductsFromDB,
  getTopSellingProductsFromDB
} from "../repositories/productRepository";
import { ProductAttributes,ProductEdit } from "../interfaces/productInterface";

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
async function getProductByCategoryService(categoryId: number) {
  try {
    const products = await getProductsByCategoryFromDB(categoryId);
    return products;
  } catch (error) {
    throw new Error("Error fetching product by Category");
  }
}
async function editProductService(productId: number, updatedProductData: ProductEdit) {
  try {
    const updatedProduct = await editProductInDB(productId, updatedProductData);
    return updatedProduct;
  } catch (error) {
    throw new Error("Error editing product");
  }
}
async function toggleProductStatusService(productId: number, active: boolean) {
  try {
    const updatedProduct = await toggleProductStatusInDB(productId, active);
    return updatedProduct;
  } catch (error) {
    throw new Error(`Error trying to toggle product status: Service`);
  }
}
async function getAllDisabledProductsService() {
  try {
    const products = await getAllDisabledProductsFromDB();
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
}
async function getTopSellingProductsService() {
  try {
    const topSellingProducts = await getTopSellingProductsFromDB(); 
    return topSellingProducts;
  } catch (error) {
    throw new Error("Error fetching top-selling products");
  }
}

export {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByCategoryService,
  editProductService,
  toggleProductStatusService,
  getAllDisabledProductsService,
  getTopSellingProductsService
};
