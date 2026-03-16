import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  addToCart,
  removeFromCart,
  getCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.post("/add-to-cart", isAuthenticated, addToCart);
router.delete("/remove-from-cart/:productId", isAuthenticated, removeFromCart);
router.delete("/clear-cart", isAuthenticated, clearCart);
router.put("/update-cart/:productId", isAuthenticated, updateCartItem);
router.get("/get-cart", isAuthenticated, getCart);

export default router;
