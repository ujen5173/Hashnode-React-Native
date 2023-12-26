import mongoose from "mongoose";

const handles = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
    appearance: {
      layout: {
        type: String,
        enum: ["MAGAZINE", "GRID", "STACKED"],
        default: "MAGAZINE",
      },
      logo: {
        type: String || null,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Handle = mongoose.model("handle", handles);
export default Handle;
