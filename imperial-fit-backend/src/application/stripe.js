import Stripe from "stripe";
import Order from "../infrastructure/schemas/Order.js";
import Product from "../infrastructure/schemas/Product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" }).send();
    }

    const order = await Order.findById(orderId).populate({
      path: "orderProducts.productId",
      model: "Product",
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" }).send();
    }

    const line_items = order.orderProducts.map((item) => {
      return {
        price_data: {
          currency: "lkr", // Ensure correct currency, setting as lkr based on frontend price format
          product_data: {
            name: item.productId.name,
            images: [item.productId.image], // Optional, include if valid URL
          },
          unit_amount: Math.round(parseFloat(item.productId.price.toString().replace(/[^0-9.]/g, "")) * 100), // Stripe uses smallest currency unit (cents)
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/confirmation?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment/credit-card?orderId=${orderId}&canceled=true`,
      metadata: {
        orderId: order._id.toString(),
        userId: order.userId.toString(),
      },
    });

    return res.status(200).json({ id: session.id, url: session.url }).send();
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ message: "Internal Server Error" }).send();
  }
};
