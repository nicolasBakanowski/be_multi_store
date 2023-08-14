import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
} from "../services/productService";
import { ProductAttributes } from "../interfaces/productInterface";

async function createProductController(req: Request, res: Response) {
  try {
    const { name, description, stock, price, imageUrl, categoryId } = req.body;
    const productData: ProductAttributes = {
      id: 0,
      name,
      description,
      stock,
      price,
      imageUrl,
      categoryId,
    };
    if (req.file) {
      productData.imageUrl = req.file.filename;
    }
    const newProduct = await createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("este es el error", error);
    res.status(500).json({ error: "Error creating product" });
  }
}

async function getAllProductsController(req: Request, res: Response) {
  try {
    console.log("entro por aca");
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.log("este es el error", error);
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
    console.log("este es el error", error);
    res.status(500).json({ error: "Error fetching product by ID" });
  }
}

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
};
