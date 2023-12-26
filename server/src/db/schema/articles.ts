import mongoose from "mongoose";

const articles = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
      required: false,
    },
    cover_image_key: {
      type: String || null,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    read_time: {
      type: Number,
      required: true,
    },
    seoTitle: {
      type: String,
      required: false,
    },
    seoDescription: {
      type: String,
      required: false,
    },
    seoOgImage: {
      type: String,
      required: false,
    },
    seoOgImageKey: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
    disabledComments: {
      type: Boolean,
      default: false,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    commentsCount: {
      type: String,
      required: false,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "series",
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("article", articles);
export default Article;