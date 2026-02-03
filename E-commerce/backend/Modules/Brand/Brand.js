import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./BrandCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
import {
  brandIdParam,
  createBrandValidator,
  getAllBrandValidator,
  updateBrandValidator,
} from "./BrandValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
const brandRouter = Router();
brandRouter
  .route("/")
  .get(getAllBrandValidator, handleValidationErrors, getAll)
  .post(isAdmin, createBrandValidator, handleValidationErrors, create);
brandRouter
  .route("/:id")
  .get(brandIdParam, handleValidationErrors, getOne)
  .patch(isAdmin, updateBrandValidator, handleValidationErrors, update)
  .delete(isAdmin, brandIdParam, handleValidationErrors, remove);
export default brandRouter;
