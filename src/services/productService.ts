import {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  getProductsByCategoryFromDB,
  searchProductsFromDB,
  editProductInDB,
  toggleProductStatusInDB,
  getAllDisabledProductsFromDB,
  getTopSellingProductsFromDB,
  deleteProductInDB
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

async function searchProductsService(params: {
  q?: string;
  categoryId?: number;
  brandId?: number;
  limit?: number;
  offset?: number;
}) {
  try {
    const limit = Math.min(Math.max(params.limit ?? 24, 1), 100);
    const offset = Math.max(params.offset ?? 0, 0);
    return await searchProductsFromDB({
      q: params.q,
      categoryId: params.categoryId,
      brandId: params.brandId,
      limit,
      offset,
    });
  } catch {
    throw new Error("Error searching products");
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

async function deleteProductService(productId: number) {
  try {
    return await deleteProductInDB(productId);
  } catch {
    throw new Error("Error deleting product");
  }
}

export {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByCategoryService,
  searchProductsService,
  editProductService,
  toggleProductStatusService,
  getAllDisabledProductsService,
  getTopSellingProductsService,
  deleteProductService
};
