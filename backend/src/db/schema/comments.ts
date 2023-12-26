import mongoose from "mongoose";

const comments = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
    },
    body: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["COMMENT", "REPLY"],
      default: "COMMENT",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", comments);
export default Comment;
