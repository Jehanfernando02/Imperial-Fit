"use strict";

import "dotenv/config";
import express from "express";
import productsRouter from "./api/products.js";
import categoriesRouter from "./api/categories.js";
import ordersRouter from "./api/orders.js";
import stripeRouter from "./api/stripe.js";
import stripeWebhookRouter from "./api/stripeWebhook.js";
import progressRouter from "./api/progress.js";
import { connectDB } from "./infrastructure/db.js";
import { globalErrorHandler } from "./api/middleware/global-error-handler.js";
import cors from "cors";

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log(JSON.stringify(process.env.MONGO_URI));
const app = express();

// Use the webhook router BEFORE express.json()
app.use("/api/stripe/webhook", stripeWebhookRouter);

app.use(express.json());

// Update the CORS to accept requests from both local and deployed frontend
const allowedOrigins = [
  "https://imperial-fit.vercel.app",
  "https://imperial-fit.onrender.com",
  "http://localhost:5173",
  "http://localhost:8000",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Define the routes for your API
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/progress", progressRouter);

// Error handling middleware
app.use(globalErrorHandler);

// Connect to the database
const PORT = process.env.Port || 8000;
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
