import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "./BrandMd.js";
import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
import Category from "./CategoryMd.js";
// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters({
      ...(req.role === "admin" || req.role === "superAdmin"
        ? {}
        : { isPublished: true }),
      ...(search ? { phoneNumber: { $regex: search, $options: "i" } } : {}),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({path:"supCategoryId"});
  const result = await feature.execute();
  res.status(200).json(result);
});
// get one
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : { $and: [{ isPublished: true }, { _id: req.params.id }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  res.status(200).json(result);
});
//create
export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create category successfully",
    data: category,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "update category successfully",
    data: category,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const product = await Product.find({ categoryId: req.params.id });
  if (product.length > 0) {
    return next(
      new HandleERROR(
        "You can not delete this category because there are products related to it",
        400,
      ),
    );
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (fs.existsSync(`${__dirname}/Public/${category.image}`)) {
    fs.unlinkSync(`${__dirname}/Public/${category.image}`);
  }
  return res.status(200).json({
    success: true,
    message: "category deleted successfully",
  });
});
