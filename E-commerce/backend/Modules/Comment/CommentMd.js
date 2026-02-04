import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    default:null
  },

  isPublished:{
    type:Boolean,
    default:true
  }
},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;