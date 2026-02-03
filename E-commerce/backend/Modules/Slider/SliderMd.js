import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide slider title"],
      unique: [true, "Slider title must be unique"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide slider image"],
      trim: true,
      default: "",
    },
    href: {
      type: String,
      required: [true, "Please provide slider link"],
    },
    path:{
        type: String,
        required: [true, "Please provide slider path"],
    } ,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;