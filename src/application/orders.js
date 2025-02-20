// application/orders.js

import { createOrderDto } from "./dto/orders.js";
import Order from "../infrastructure/schemas/Order.js";
import { NotFoundError } from "../domain/errors/not-found-error.js";
import { ValidationError } from "../domain/errors/validation-error.js";

// Create an order
export const createOrder = async (req, res) => {
  const order = createOrderDto.safeParse(req.body);
  console.log(order);

  if (!order.success) {
    throw new ValidationError(order.error.message);
  }

  const createdOrder = await Order.create({
    userId: order.data.userId,
    orderProducts: order.data.orderProducts,
    address: order.data.address,
  });
  return res.status(201).json(createdOrder);
};

// Handle payment updates (webhook)
export const handlePayment = async (req, res) => {
  const { orderId, status } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  if (status === "SUCCESS") { 
    order.paymentStatus = "PAID";
    await order.save();
    return res.status(200).send();
  }

  if (status === "FAILED") {
    return res.status(200).send();
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate({
    path: "orderProducts.productId",
    model: "Product",
  });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return res.status(200).json(order);
};

// Get all orders by a specific user
export const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId: userId }).populate({
      path: "orderProducts.productId",
      model: "Product",
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
