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
    discountPercent: {
      type: Number,
      default: 0,
      min: [0, "minimum is 0"],
      max: [100, "maximum is 100"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "minimum price is 0"],
      validate: {
        validator: (item) => {
          return item <= this.price;
        },
        message: "price must be greater than price after discount",
      },
    },
    boughtCount:{
      type:Number ,
      default:0
    }
  },
  { timestamps: true },
);
const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
productVariantSchema.pre("save", function (next) {
  this.priceAfterDiscount = +(this.price * (1 - this.discountPercent / 100)).toFixed(2);
  next();
});
productVariantSchema.pre("findOneAndUpdate", function (next) {
  this.priceAfterDiscount = +(this.price * (1 - this.discountPercent / 100)).toFixed(2);
  next();
});
export default ProductVariant;
