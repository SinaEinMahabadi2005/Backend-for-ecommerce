import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Product" ,
    required:[true ,"product id is required"]
  } ,
   productVariantId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"ProductVariant" ,
    required:[true ,"ProductVariant id is required"]
  } ,
   categoryId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Category" ,
    required:[true ,"category id is required"]
  } ,
   brandId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Brand" ,
    required:[true ,"brand id is required"]
  } ,
  quantity:{
    type:Number ,
    default:0
  }
},{_id:false})
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items:{
      type:[itemSchema] ,
      default:[]
    } ,
    totalPrice:{
      type:Number ,
      default:0
    } ,
     totalPriceAfterDiscount:{
      type:Number ,
      default:0
    }
  },
  { timestamps: true },
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
