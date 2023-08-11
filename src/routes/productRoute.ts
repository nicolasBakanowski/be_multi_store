import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from "../controllers/productController";

const productRoute = express.Router();

productRoute.post("/new", createProductController);
productRoute.get("/all", getAllProductsController);
productRoute.get("/:id", getProductByIdController);

export default productRoute;
