import Stripe from "stripe";
import Order from "../infrastructure/schemas/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;

    if (orderId) {
      try {
        await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" });
        console.log(`Order ${orderId} marked as paid successfully.`);
      } catch (error) {
        console.error(`Error updating order ${orderId}:`, error);
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send();
};
