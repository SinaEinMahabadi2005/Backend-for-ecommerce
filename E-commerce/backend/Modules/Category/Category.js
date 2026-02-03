import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./CategoryCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
import { categoryIdParam, createCategoryValidator, getAllCategoryValidator, updateCategoryValidator } from "./CategoryValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
const categoryRouter = Router();
categoryRouter.route("/").get(getAllCategoryValidator,handleValidationErrors,getAll).post(isAdmin,createCategoryValidator,handleValidationErrors, create);
categoryRouter
  .route("/:id")
  .get(categoryIdParam,handleValidationErrors,getOne)
  .patch(isAdmin,updateCategoryValidator,handleValidationErrors, update)
  .delete(isAdmin,categoryIdParam,handleValidationErrors, remove);
export default categoryRouter