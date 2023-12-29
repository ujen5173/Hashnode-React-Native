import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    tagline: {
      type: String,
      required: false,
    },
    cover_image: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    skills: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    available: {
      type: String,
      required: false,
    },
    articles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "articles",
    },
    social: {
      github: String,
      twitter: String,
      website: String,
      youtube: String,
      facebook: String,
      linkedin: String,
      instagram: String,
      stackoverflow: String,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    stripeCustomerId: {
      type: String,
      required: false,
    },
    stripeSubscriptionId: {
      type: String,
      required: false,
    },
    stripeSubscriptionStatus: {
      type: String,
      enum: [
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "trialing",
        "unpaid",
      ],
      default: "incomplete",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", users);

export default User;
