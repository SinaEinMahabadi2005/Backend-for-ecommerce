import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./SliderCn.js";
import isAdmin from "../../Middlewares/isAdmin";
const sliderRouter = Router();
sliderRouter.route("/").get(getAll).post(isAdmin, create);
sliderRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
  export default sliderRouter
