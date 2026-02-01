import Router from "express";
import { authValidator } from "./AuthValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import {
  auth,
  forgetPassword,
  loginWithOtp,
  loginWithPassword,
  resendCode,
} from "./AuthCn.js";
const authRouter = Router();
authRouter.route("/").post(authValidator, handleValidationErrors, auth);
authRouter
  .route("/login-password")
  .post(authValidator, handleValidationErrors, loginWithPassword);
authRouter
  .route("/login-otp")
  .post(authValidator, handleValidationErrors, loginWithOtp);
authRouter
  .route("/resend-code")
  .post(authValidator, handleValidationErrors, resendCode);
authRouter
  .route("/forget-password")
  .post(authValidator, handleValidationErrors, forgetPassword);
export default authRouter;
