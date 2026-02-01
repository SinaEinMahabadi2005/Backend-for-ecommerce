import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/UserMd.js";
import { sendAuthCode, verifyCode } from "../../Utils/smsHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Cart from "../Cart/CartMd.js";
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
  const { phoneNumber, password } = req.body;
  // complete populate cartId
  const user = await User.findOne({ phoneNumber }).populate("cartId");
  if (!user || !user?.password) {
    return next(new HandleERROR("invalid phoneNumber Or Password", 400));
  }
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("invalid phoneNumber Or Password", 400));
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  return res.status(200).json({
    success: true,
    message: "login with password successfully",
    token,
    user: {
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      cartId: user.cartId,
    },
  });
});
//
export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber, code } = req.body;
  const resultVerify = await verifyCode(phoneNumber, code);
  if (!resultVerify) {
    return next(new HandleERROR("invalid code", 400));
  }
  const user = await User.findOne({ phoneNumber }).populate("cartId");
  if (!user) {
    user = await User.create({ phoneNumber });
    const cartId = await Cart.create({ userId: user._id });
    user.cartId = cartId._id;
    await user.save();
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  return res.status(200).json({
    success: true,
    message: "login with otp successfully",
    token,
    user: {
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      cartId: user.cartId,
    },
  });
});
export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const resultSms = await sendAuthCode(phoneNumber);
  if (!resultSms) {
    return res.status(500).json({
      success: false,
      message: resultSms.message,
    });
  }
  return res.status(200).json({
    success: true,
    message: "otp code sent",
  });
});
