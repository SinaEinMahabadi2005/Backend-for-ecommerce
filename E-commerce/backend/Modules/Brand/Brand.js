import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./BrandCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
const brandRouter = Router();
brandRouter.route("/").get(getAll).post(isAdmin, create);
brandRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
export default brandRouter;
