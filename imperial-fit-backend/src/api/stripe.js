import express from "express";
import { createCheckoutSession } from "../application/stripe.js";

const stripeRouter = express.Router();

stripeRouter.route("/create-checkout-session").post(createCheckoutSession);

export default stripeRouter;
