import express from "express";
import { Webhook } from "svix";
import User from "../infrastructure/schemas/User.js";

const clerkWebhookRouter = express.Router();

// The webhook endpoint needs to parse the raw body to verify the svix signature
clerkWebhookRouter.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  // Get the headers
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  // If there are no svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: "Error occured -- no svix headers",
    });
  }

  // Get the body
  const payload = req.body;
  const body = payload.toString("utf8");

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Process the event
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id: clerkId, email_addresses, first_name, last_name, image_url } = evt.data;
      const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : "";
      
      await User.findOneAndUpdate(
        { clerkId },
        {
          clerkId,
          email,
          firstName: first_name || "",
          lastName: last_name || "",
          imageUrl: image_url || "",
        },
        { upsert: true, new: true }
      );
    } else if (eventType === "user.deleted") {
      const { id: clerkId } = evt.data;
      await User.findOneAndDelete({ clerkId });
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
    });
  } catch (error) {
    console.error(`Error processing ${eventType}:`, error);
    return res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

export default clerkWebhookRouter;
