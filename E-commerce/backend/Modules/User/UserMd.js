import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    match: [/^(?:0|\+98)?[1-9]\d{9}$/, "invalid phone number format"],
    unique: [true, "phone number already exist"],
    required: [true, "phone number is required"],
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
    default: "",
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    default: null,
  },
  addressIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    default: [],
  },
  favoriteProductIds:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"product"
        }
    ] ,
    default:[]
  } ,
    boughtProductIds:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"product"
        }
    ] ,
    default:[]
  } ,
   role:{
    type:String ,
    enum:["superAdmin" , "user" ,"admin"] ,
    default:"user"
   } ,
   isActive:{
    type:Boolean ,
    default:true
   } ,
       ratedProductIds:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"product"
        }
    ] ,
    default:[]
  } ,
} ,{timestamps:true});
const User=mongoose.model("User" ,userSchema)
export default User
