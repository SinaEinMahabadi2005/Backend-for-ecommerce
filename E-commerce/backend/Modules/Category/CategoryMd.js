import mongoose from "mongoose"
const categorySchema=new mongoose.Schema({
    title:{
        type:String ,
        required:[true,"Please provide brand name"],
        unique:[true,"Brand name must be unique"],
        trim:true,
    } ,
    image:{
        type:String ,
        default:""
    } ,
     parentCategoryId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Category"
    } ,
    isPublished:{
        type:Boolean ,
        default :true
    }
} , {timestamps:true})
const Category=mongoose.model("Category",categorySchema)
export default Category