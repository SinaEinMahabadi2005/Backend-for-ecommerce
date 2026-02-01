import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/UserMd.js";
import { sendAuthCode } from "../../Utils/smsHandler.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user || !user?.password) {
    const resultSms = sendAuthCode(phoneNumber);
    if (!resultSms) {
      return res.status(500).json({
        success: false,
        message: resultSms.message,
      });
    }
  }
  return res.status(200).json({
    success: true,
    message: !user || !user?.password ? "otp code sent" : "Login with Password",
    data: {
      userExist: user ? true : false,
      passwordExist: user?.password ? true : false,
    },
  });
});
export const loginWithPassword = catchAsync(async (req, res, next) => {
  const {phoneNumber , password}=req.body
  // complete populate cartId
  const user=await User.findOne({phoneNumber}).populate("cartId")
  if(!user || !user?.password){
    return next(new HandleERROR("invalid phoneNumber Or Password",400))
  }
  const isMatch=bcryptjs.compareSync(password,user.password)
  if(!isMatch){
    return next(new HandleERROR("invalid phoneNumber Or Password",400))
  }
  const token=jwt.sign({_id:user._id , role:user.role},process.env.JWT_SECRET)
  return res.status(200).json({
    success:true ,
    message:"login successfully" ,
    token ,
    user:{
      _id:user._id ,
      role:user.role ,
      fullName:user.fullName ,
      phoneNumber:user.phoneNumber ,
      cartId:user.cartId
    }
  })

});
