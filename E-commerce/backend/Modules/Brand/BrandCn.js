import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "./BrandMd.js";
import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters({
      ...(req.role == "admin" || req.role == "superAdmin"
        ? {}
        : { isPublished: true }),
      ...(req.query.search
        ? { title: { $regex: req.query.search, $options: "i" } }
        : {}),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  res.status(200).json(result);
});
// get one
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Brand, req.query, req.role)
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
  const brand = await Brand.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create brand successfully",
    data: brand,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "update brand successfully",
    data: brand,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const product = await Product.find({ brandId: req.params.id });
  if (product.length > 0) {
    return next(
      new HandleERROR(
        "You can not delete this brand because there are products related to it",
        400,
      ),
    );
  }
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (fs.existsSync(`${__dirname}/Public/${brand.image}`)) {
    fs.unlinkSync(`${__dirname}/Public/${brand.image}`);
  }
  return res.status(200).json({
    success: true,
    message: "brand deleted successfully",
  });
});
