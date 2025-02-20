// Updated ordersRouter.js
import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,  // Import the function to get all orders by user
  handlePayment,
} from "../application/orders.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const ordersRouter = express.Router();

ordersRouter.route("/").post(ClerkExpressRequireAuth({}), createOrder);
ordersRouter.route("/:id").get(ClerkExpressRequireAuth({}), getOrderById);

// New route to get all orders for the logged-in user
ordersRouter.route("/user/:userId").get(ClerkExpressRequireAuth({}), getOrdersByUser);

ordersRouter.route("/webhook/payment").post(handlePayment);

export default ordersRouter;
