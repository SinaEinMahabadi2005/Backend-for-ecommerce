import Router from "express"
import { create, favorite, getAll, getOne, remove, update } from "./ProductCn.js"
import isAdmin from "../../Middlewares/isAdmin.js"
import isLogin from "../../Middlewares/isLogin"
const productRouter=Router()
productRouter.route("/").get(getAll).post(isAdmin,create)
productRouter.route("/:id").get(getOne).patch(isAdmin,update).delete(isAdmin,remove)
productRouter.route("/favorite/:id").post(isLogin,favorite)