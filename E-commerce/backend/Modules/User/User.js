import { Router } from "express";
import isAdmin from "../../Middlewares/isAdmin.js";
import {
  getAllUserValidator,
  updateUserValidator,
  userIdParam,
} from "./UserValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { getAll, getOne, update } from "./UserCn.js";
import isLogin from "../../Middlewares/isLogin.js";
const userRouter = Router();
userRouter
  .route("/")
  .get(isAdmin, getAllUserValidator, handleValidationErrors, getAll);
userRouter
  .route("/:id")
  .get(isLogin, userIdParam, handleValidationErrors, getOne)
  .patch(isLogin, updateUserValidator, handleValidationErrors, update);
  export default userRouter
