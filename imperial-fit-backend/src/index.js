"use strict";

import express from "express";
import productsRouter from "./api/products.js";
import categoriesRouter from "./api/categories.js";
import ordersRouter from "./api/orders.js";
import { connectDB } from "./infrastructure/db.js";
import { globalErrorHandler } from "./api/middleware/global-error-handler.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Update the CORS to accept requests from the deployed frontend on Vercel
app.use(cors({
  origin: "https://imperial-fit-61ce.vercel.app"  // Update this to match your deployed frontend URL
}));

// Define the routes for your API
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);

// Error handling middleware
app.use(globalErrorHandler);

// Connect to the database
const PORT = process.env.Port || 8000;
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
