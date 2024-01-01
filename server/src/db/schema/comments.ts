import mongoose from "mongoose";
import { Articles } from "./index.js";

const comments = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Articles,
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
      ref: "comment",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", comments);
export default Comment;
