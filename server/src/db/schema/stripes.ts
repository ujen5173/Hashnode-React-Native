import mongoose from "mongoose";

const stripe = new mongoose.Schema(
  {
    api_version: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.Mixed,
    },
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: false,
    },
    pending_webhooks: {
      type: Number,
      required: true,
    },
    livemode: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created",
    },
  }
);

const Stripe = mongoose.model("stripe", stripe);
export default Stripe;
