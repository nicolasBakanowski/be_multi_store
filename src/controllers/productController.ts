import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByCategoryService,
  searchProductsService,
  toggleProductStatusService,
  getAllDisabledProductsService,
  getTopSellingProductsService,
  deleteProductService,
} from "../services/productService";
import { editProductService } from "../services/productService";
import { ProductAttributes,ProductEdit } from "../interfaces/productInterface";
import {
  deleteEntityImageFolder,
  entityImagePublicUrl,
  saveEntityImageFromBuffer,
} from "../helpers/imageService";

async function createProductController(req: Request, res: Response) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const productData: ProductAttributes = {
      id: 0,
      ...req.body,
      imageUrl: "pending",
    };
    const newProduct = await createProductService(productData);

    await saveEntityImageFromBuffer({
      entityType: "product",
      entityId: newProduct.id,
      buffer: req.file.buffer,
    });
    const imageUrl = entityImagePublicUrl(req, "product", newProduct.id);
    const updated = await editProductService(newProduct.id, {
      imageUrl,
    } as ProductEdit);

    res.status(201).json(updated);
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

async function searchProductsController(req: Request, res: Response) {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const categoryId =
      typeof req.query.categoryId === "string"
        ? parseInt(req.query.categoryId, 10)
        : undefined;
    const brandId =
      typeof req.query.brandId === "string"
        ? parseInt(req.query.brandId, 10)
        : undefined;
    const limit =
      typeof req.query.limit === "string" ? parseInt(req.query.limit, 10) : undefined;
    const offset =
      typeof req.query.offset === "string"
        ? parseInt(req.query.offset, 10)
        : undefined;

    const products = await searchProductsService({
      q,
      categoryId: Number.isFinite(categoryId) ? categoryId : undefined,
      brandId: Number.isFinite(brandId) ? brandId : undefined,
      limit: Number.isFinite(limit) ? limit : undefined,
      offset: Number.isFinite(offset) ? offset : undefined,
    });
    return res.status(200).json(products);
  } catch {
    return res.status(500).json({ error: "Error searching products" });
  }
}

async function editProductController(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = await editProductService(productId, req.body as ProductEdit);
    if (req.file?.buffer) {
      await saveEntityImageFromBuffer({
        entityType: "product",
        entityId: productId,
        buffer: req.file.buffer,
      });
      const imageUrl = entityImagePublicUrl(req, "product", productId);
      const updatedWithImage = await editProductService(productId, {
        imageUrl,
      } as ProductEdit);
      return res.status(200).json(updatedWithImage);
    }
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
    const topSellingProducts = await getTopSellingProductsService();
    res.status(200).json(topSellingProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top-selling products" });
  }
}

async function deleteProductController(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const existing = await getProductByIdService(productId);
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }
    await deleteEntityImageFolder({ entityType: "product", entityId: productId });
    await deleteProductService(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Error deleting product" });
  }
}

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByCategoryController,
  searchProductsController,
  editProductController,
  toggleProductStatusController,
  getAllDisabledProductsController,
  getTopSellingProductsController,
  deleteProductController,
};
