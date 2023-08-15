import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
const categoryRoute = express.Router();

categoryRoute.post(
  "/new",
  authMiddleware,
  isAdminMiddleware,
  createCategoryController
);
categoryRoute.get("/all", getAllCategoriesController);

export default categoryRoute;
