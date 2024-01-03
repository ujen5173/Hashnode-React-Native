import mongoose from "mongoose";

const tags = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    articlesCount: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("tags", tags);
export default Tag;
