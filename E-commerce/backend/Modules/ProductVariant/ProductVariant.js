import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variant",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      min: [0, "minimum is 0"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "minimum price is 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "minimum price is 0"],
      validate: {
        validator: (item) => {
          return item < this.price;
        },
        message: "price must be greater than price after discount",
      },
    },
  },
  { timestamps: true },
);
const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
