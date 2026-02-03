import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
import Variant from "./VariantMd.js";
import ProductVariant from "../ProductVariant/ProductVariant.js";

// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Variant, req.query, req.role)
    .addManualFilters(
      req.query.search
        ? { value: { $regex: req.query.search, $options: "i" } }
        : {},
    )
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
  const feature = new ApiFeatures(Variant, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
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
  const variant = await Variant.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create variant successfully",
    data: variant,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const variant = await Variant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "update variant successfully",
    data: variant,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.find({
    variantId: req.params.id,
  });
  if (productVariant.length > 0) {
    return next(
      new HandleERROR(
        "You can not delete this variant because there are products related to it",
        400,
      ),
    );
  }
  const variant = await Variant.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "variant deleted successfully",
  });
});
