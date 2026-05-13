import { createOrderDto } from "./dto/orders.js";
import Order from "../infrastructure/schemas/Order.js";

export const createOrder = async (req, res) => {
  const order = createOrderDto.safeParse(req.body);

  if (!order.success) {
    return res
      .status(400)
      .json({ message: `${order.error.message}` });
  }

  const createdOrder = await Order.create({
    userId: order.data.userId,
    orderProducts: order.data.orderProducts,
    address: order.data.address,
  });
  return res.status(201).json(createdOrder);
};

export const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate({
    path: "orderProducts.productId",
    model: "Product",
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.status(200).json(order);
};

// export const getOrderForUser = async (req, res) => {
//   const userId = req.params.userId;
//   const orders = await Order.find({ userId : userId });
//     return res.status(200).json(orders).send();
// };