import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/analyticsRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT || 3000;

// Only raw body for Stripe webhook
app.use("/api/v1/payment/webhook", express.raw({ type: "application/json" }));

// JSON parser for everything else
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/v1/payment/webhook")) {
    next(); // skip JSON parser for Stripe
  } else {
    express.json({ limit: "10mb" })(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
