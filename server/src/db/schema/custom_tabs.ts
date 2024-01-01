import mongoose from "mongoose";

const custom_tabs = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    priority: {
      type: Number,
      default: 0,
    },
    handle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "handle",
    },
  },
  {
    timestamps: true,
  }
);

const CustomTab = mongoose.model("custom_tab", custom_tabs);
export default CustomTab;
