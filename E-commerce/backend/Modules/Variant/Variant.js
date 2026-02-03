import Rooter, { Router } from "express";
import {
  createVariantValidator,
  getAllVariantValidator,
  updateVariantValidator,
  variantIdParam,
} from "./VariantValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { create, getAll, getOne, remove, update } from "./VariantCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
const variantRouter = Router();
variantRouter
  .route("/")
  .get(getAllVariantValidator, handleValidationErrors, getAll)
  .post(isAdmin, createVariantValidator, handleValidationErrors, create);
variantRouter
  .route("/:id")
  .get(variantIdParam, handleValidationErrors, getOne)
  .patch(isAdmin, updateVariantValidator, handleValidationErrors, update)
  .delete(isAdmin, variantIdParam, handleValidationErrors, remove);
export default variantRouter;
