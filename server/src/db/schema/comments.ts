import mongoose from "mongoose";

const comments = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
    },
    content: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
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
