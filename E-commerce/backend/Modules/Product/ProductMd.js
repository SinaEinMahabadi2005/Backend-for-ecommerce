import mongoose from "mongoose";
const informationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: [true, "title is unique"],
      required: [true, "title  is required"],
    },
    value: {
      type: String,
      default: "",
      required: [true, "value  is required"],
    },
  },
  { _id: false },
);
//
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "title is unique"],
      required: [true, "title  is required"],
    },
    description: {
      type: String,
      default: "",
      required: [true, "description  is required"],
    },
    information: {
      type: [informationSchema],
      default: [],
    },
    avrageRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    defaultProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: [true, "ProductVariant id is required"],
      default: null,
    },
    defaultProductIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
          required: [true, "ProductVariant id is required"],
        },
      ],
      default: [],
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "brand id is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category id is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const Product = mongoose.model("Product", productSchema);
export default Product;
