import express from "express";
import {
  createCheckoutSession,
  getAllOrders,
  handleStripeWebhook,
} from "../controllers/paymentController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);

// raw body for stripe
router.post("/webhook", handleStripeWebhook);
router.get("/admin/orders", isAuthenticated, isAdmin, getAllOrders);
export default router;
