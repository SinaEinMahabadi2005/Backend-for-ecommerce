import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./AddressCn.js";
const addressRouter = Router();
addressRouter.route("/").post(create).get(getAll);
addressRouter.route("/:id").patch(update).get(getOne).delete(remove);
export default addressRouter;
