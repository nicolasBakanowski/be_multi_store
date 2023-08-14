import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from "../controllers/productController";
import { upload } from "../helpers/imageUtils";
import isAdminMiddleware from "../middleware/isAdminMiddleware";

const productRoute = express.Router();

productRoute.post(
  "/new",
  isAdminMiddleware,
  upload.single("productImage"),
  createProductController
);
productRoute.get("/all", getAllProductsController);
productRoute.get("/:id", getProductByIdController);

export default productRoute;
