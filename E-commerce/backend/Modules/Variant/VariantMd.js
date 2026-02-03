import mongoose from "mongoose";
const variantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["size", "color"],
      default: "size",
    },
    value: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
