import Product from "../models/productModel";
import { ProductAttributes,ProductEdit } from "../interfaces/productInterface";
import sequelize from "../db";

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
        available: true,
      },
    });
    return products;
  } catch (error) {
    throw new Error("Error fetching products by category from the database");
  }
}

async function editProductInDB(productId: number, updatedProductData: ProductEdit) {
  try {
    const [updatedRowsCount] = await Product.update(updatedProductData, {
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

async function toggleProductStatusInDB(productId: number, active: boolean) {
  try {
    const [updatedRowsCount] = await Product.update({ available: active }, {
      where: { id: productId }
    });
    if (updatedRowsCount === 0) {
      throw new Error("Product not found or already disabled");
    }
    return await getProductByIdFromDB(productId);
  } catch (error) {
    throw new Error("Error disabling product in the database");
  }
}
async function getAllDisabledProductsFromDB() {
  try {
    const unavailableProducts = await Product.findAll({
      where: {
        available: 0 
      }
    });
    return unavailableProducts;
  } catch (error) {
    throw new Error("Error fetching unavailable products from the database");
  }
}

async function getTopSellingProductsFromDB() {
  try {
    const [results, metadata] = await sequelize.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        SUM(op.quantity) AS totalSold
      FROM 
        products p
      JOIN 
        OrderProducts op ON p.id = op.productId
      GROUP BY 
        p.id, p.name, p.price
      ORDER BY 
        totalSold DESC
      LIMIT 10;
    `);
    return results; 
  } catch (error) {
    throw new Error("Error fetching top-selling products from the database");
  }
}

async function getProductsCost(productIds: number[]) {
  try {
    const products = await Product.findAll({
      where: {
        id: productIds,
      },
      attributes: ["costPrice"],
    });
    const totalCost = products.reduce((acc, product) => acc + (product.costPrice || 0), 0);
    return totalCost;
  } catch (error) {
    throw new Error("Error fetching products cost from the database");
  }
}



export {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  getProductsByCategoryFromDB,
  editProductInDB,
  toggleProductStatusInDB,
  getAllDisabledProductsFromDB,
  getTopSellingProductsFromDB,
  getProductsCost
};
