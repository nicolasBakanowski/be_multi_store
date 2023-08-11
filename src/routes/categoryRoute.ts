import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/categoryController";

const categoryRoute = express.Router();

categoryRoute.post("/new", createCategoryController);
categoryRoute.get("/all", getAllCategoriesController);

export default categoryRoute;
