import mongoose from "mongoose";
const discountCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      unique: [true, "code is unique"],
      trim: true,
    },
    maxPrice: {
      type: Number,
    },
    minPrice: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["percent", "amount"],
      required: [true, "type is required"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
      validate:{
        validator:function(item){
          return item < this.startDate
        },
        message:"invalid Date time"
      }
    },
    value: {
      type: String,
      required: [true, "value is required"],
    },
    maxUsedCount: {
      type: Number,
      default: 1,
    },
    userIdsUsed: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    isPublished:{
      type:Boolean ,
      default:true
    }
  },
  { timestamps: true },
);
const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);
export default DiscountCode;
