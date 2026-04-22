import express from "express";
import { upload } from "../helpers/imageUtils";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import {
  createBrandController,
  deleteBrandController,
  editBrandController,
  getAllBrandsController,
} from "../controllers/brandController";

const brandRoute = express.Router();

brandRoute.post(
  "/new",
  authMiddleware,
  isAdminMiddleware,
  upload.single("brandImage"),
  createBrandController
);
brandRoute.put(
  "/edit/:id",
  authMiddleware,
  isAdminMiddleware,
  upload.single("brandImage"),
  editBrandController
);
brandRoute.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteBrandController
);
brandRoute.get("/all", getAllBrandsController);

export default brandRoute;

