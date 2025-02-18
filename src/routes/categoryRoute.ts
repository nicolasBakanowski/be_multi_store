import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/categoryController";
import { upload } from "../helpers/imageUtils";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
const categoryRoute = express.Router();

categoryRoute.post(
  "/new",
  authMiddleware,
  isAdminMiddleware,
  upload.single("categoryImage"),
  createCategoryController
);
categoryRoute.get("/all", getAllCategoriesController);
/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Obtiene todas las categorias
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 */
export default categoryRoute;
