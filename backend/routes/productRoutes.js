import express from "express";
import upload from "../middleware/multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getCurrentMonthProducts,
  filterProducts,
  getUniqueCategories,
} from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.array("images", 5),
  createProduct,
);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteProduct);
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images", 5),
  updateProduct,
);
router.get("/thismonth", getCurrentMonthProducts);
router.get("/all", getAllProducts);
router.get("/filter", isAuthenticated, filterProducts);
router.get("/categories", getUniqueCategories);
router.get("/:id", getProductById);

export default router;
