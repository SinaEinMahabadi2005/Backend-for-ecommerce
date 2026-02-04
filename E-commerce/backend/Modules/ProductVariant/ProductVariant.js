import mongoose from "mongoose"
const productVariantSchema=new mongoose.Schema({
 variantId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"variant"
 } ,
 productId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Product" ,
     required: [true, "Product id is required"],
 }
} , {timestamps:true})
const ProductVariant=mongoose.model("ProductVariant",productVariantSchema)
export default ProductVariant