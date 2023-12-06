import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByCategoryService,
} from "../services/productService";

import { ProductAttributes } from "../interfaces/productInterface";

async function createProductController(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      stock,
      price,
      imageUrl,
      categoryId,
      shortDescription,
      available,
    } = req.body;
    const productData: ProductAttributes = {
      id: 0,
      name,
      description,
      stock,
      price,
      imageUrl,
      categoryId,
      shortDescription,
      available,
    };
    if (req.file) {
      productData.imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/dist/uploads/product/${req.file.originalname}`;
    }
    const newProduct = await createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
}

async function getAllProductsController(req: Request, res: Response) {
  try {
    const products = await getAllProductsService();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
}

async function getProductByIdController(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await getProductByIdService(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product by ID" });
  }
}

async function getProductByCategoryController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);
    const products = await getProductByCategoryService(categoryId);
    if (!products) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product by ID" });
  }
}

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByCategoryController,
};
