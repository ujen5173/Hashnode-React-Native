import mongoose from "mongoose";

const articles = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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
    tags: {
      type: [String],
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    commentsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
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
