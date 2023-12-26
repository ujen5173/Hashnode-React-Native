import mongoose from "mongoose";

const notifications = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["COMMENT", "LIKE", "FOLLOW", "ARTICLE"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    body: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", notifications);
export default Notification;
