import express from "express";
import { handleStripeWebhook } from "../application/stripeWebhook.js";

const stripeWebhookRouter = express.Router();

stripeWebhookRouter.route("/").post(express.raw({ type: "application/json" }), handleStripeWebhook);

export default stripeWebhookRouter;
