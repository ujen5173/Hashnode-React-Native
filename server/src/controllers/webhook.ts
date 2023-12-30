// @ts-nocheck
import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import { Users } from "../db/schema/index.js";

const handleWebhook = async (req, res) => {
  try {
    const payloadString = req.body;
    const svixHeaders = req.headers;

    // Get the Svix headers for verification
    const svix_id = svixHeaders["svix-id"] as string;
    const svix_timestamp = svixHeaders["svix-timestamp"] as string;
    const svix_signature = svixHeaders["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new Error("Missing headers");
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);

    const evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    const { id, ...attributes } = evt.data;

    // Handle the webhooks
    const eventType = evt.type;
    if (eventType === "user.created") {
      await Users.create({
        userId: id,
        name: attributes.first_name + " " + attributes.last_name,
        email: attributes.email_addresses[0].email_address,
        username:
          attributes.username ||
          attributes.email_addresses[0].email_address.split("@")[0],
        image: attributes.profile_image_url,
      });
    }
    if (eventType === "user.deleted") {
      await Users.deleteOne({ userId: id });
    }

    if (eventType === "user.updated") {
      await Users.updateOne(
        { userId: id },
        {
          name: attributes.first_name + " " + attributes.last_name,
          email: attributes.email_addresses[0].email_address,
          username:
            attributes.username ||
            attributes.email_addresses[0].email_address.split("@")[0],
          image: attributes.profile_image_url,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Operation Performed!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while creating account",
      error: err.message || "Internal server error",
    });
  }
};

export default handleWebhook;
