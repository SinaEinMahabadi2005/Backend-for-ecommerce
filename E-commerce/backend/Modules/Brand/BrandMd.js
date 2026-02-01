import mongoose from "mongoose"
const brandSchema=new mongoose.Schema({
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
    isPublished:{
        type:Boolean ,
        default :true
    }
} , {timestamps:true})
const Brand=mongoose.model("Brand",brandSchema)
export default Brand