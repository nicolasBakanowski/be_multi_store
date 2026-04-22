import express from "express";
import {
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
} from "../controllers/productController";
import { upload } from "../helpers/imageUtils";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
const productRoute = express.Router();
productRoute.post(
  "/new",
  authMiddleware,
  isAdminMiddleware,
  upload.single("productImage"),
  createProductController
);
productRoute.put(
  "/edit/:id",
  authMiddleware,
  isAdminMiddleware,
  upload.single("productImage"),
  editProductController
);
productRoute.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteProductController
);
productRoute.get("/search", searchProductsController);
productRoute.get("/topSelling",getTopSellingProductsController);
productRoute.get("/all", getAllProductsController);
productRoute.get("/disabled",getAllDisabledProductsController)
productRoute.get("/category/:categoryId", getProductByCategoryController);
productRoute.get("/:id", getProductByIdController);
productRoute.patch("/status/:id",authMiddleware,
isAdminMiddleware,toggleProductStatusController)

export default productRoute;
