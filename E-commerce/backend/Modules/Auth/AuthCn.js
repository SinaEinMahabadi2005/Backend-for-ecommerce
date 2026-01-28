import { catchAsync } from "vanta-api";
import User from "../User/UserMd.js";
import { sendAuthCode } from "../../Utils/smsHandler.js";

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
