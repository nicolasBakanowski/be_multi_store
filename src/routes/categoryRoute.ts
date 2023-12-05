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
  (req, res, next) => {
    console.log(req.file, "aver como llega esto"); // Agrega un log para ver el objeto de archivo
    next();
  },
  upload.single("categoryImage"),
  createCategoryController
);
categoryRoute.get("/all", getAllCategoriesController);

export default categoryRoute;
