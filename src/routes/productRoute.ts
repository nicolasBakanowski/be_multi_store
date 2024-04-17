import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByCategoryController,
  editProductController,
  toggleProductStatusController
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
productRoute.get("/all", getAllProductsController);
productRoute.get("/:id", getProductByIdController);
productRoute.get("/category/:categoryId", getProductByCategoryController);
productRoute.patch("/status/:id",toggleProductStatusController)
export default productRoute;
