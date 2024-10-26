import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByCategoryService,
  toggleProductStatusService,
  getAllDisabledProductsService,
  getTopSellingProductsService
} from "../services/productService";
import { editProductService } from "../services/productService";
import { ProductAttributes,ProductEdit } from "../interfaces/productInterface";

async function createProductController(req: Request, res: Response) {
  try {
    const productData: ProductAttributes = {
      id: 0,
      ...req.body
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

async function editProductController(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = await editProductService(productId, req.body as ProductEdit);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Error editing product" });
  }
  
}
async function toggleProductStatusController(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const { active } = req.body; 
    if (!productId) {
      return res.status(400).json({ error: "Invalid product ID" });
    } 
    const isActive = (typeof active === 'string') ? (active.toLowerCase() === 'true') : active;
    if (isActive === undefined || typeof isActive !== 'boolean') {
      return res.status(400).json({ error: "Invalid 'active' status provided" });
    }
    const updatedProduct = await toggleProductStatusService(productId, isActive); 
    if (updatedProduct) {
      return res.status(200).json({
        message: `Product ${active ? 'activated' : 'deactivated'} successfully`,
        product: updatedProduct
      });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error updating product status" });
  }
}
async function getAllDisabledProductsController(req: Request, res: Response) {
  try {
    const products = await getAllDisabledProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
}
async function getTopSellingProductsController(req: Request, res: Response) {
  try {
    console.log("no se porque no entra pora aca")
    const topSellingProducts = await getTopSellingProductsService();
    res.status(200).json(topSellingProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top-selling products" });
  }
}

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByCategoryController,
  editProductController,
  toggleProductStatusController,
  getAllDisabledProductsController,
  getTopSellingProductsController
};
