import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "./ProductMd.js";
import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
import User from "../User/UserMd.js";
import ProductVariant from "../ProductVariant/ProductVariant.js";
import Comment from "../Comment/CommentMd.js";
// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Product, req.query, req.role)
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
    .populate([
      { path: "defaultProductVariantId", populate: { path: "variantId" } },
      { path: "categoryId" },
      { path: "brandId" },
    ]);

  const result = await feature.execute();
  res.status(200).json(result);
});
// get one
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Product, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : { $and: [{ isPublished: true }, { _id: req.params.id }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "ProductVariantIds", populate: { path: "variantId" } },
      { path: "categoryId" },
      { path: "brandId" },
    ]);
  const result = await feature.execute();
  if (req.userId) {
    const isFavorite = false;
    const isBought = false;
    const isRated = false;
    const user = await User.findById(req.userId);
    isFavorite = user.favoriteProductIds.find(
      (item) => item.toString() == req.params.id.toString(),
    )
      ? true
      : false;
    isBought = user.boughtProductIds.find(
      (item) => item.toString() == req.params.id.toString(),
    )
      ? true
      : false;
    isRated = user.ratedProductIds.find(
      (item) => item.toString() == req.params.id.toString(),
    )
      ? true
      : false;
  }
  res.status(200).json({ ...result, isFavorite, isBought, isRated });
});
//create
export const create = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create product successfully",
    data: product,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "update product successfully",
    data: product,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product.boughtCount > 0) {
    return next(
      new HandleERROR(
        "You can not delete this product because there are products related to it",
        400,
      ),
    );
  }
  await Product.findByIdAndDelete(req.params.id);
  for (let img of product.images) {
    if (fs.existsSync(`${__dirname}/Public/${img}`)) {
      fs.unlinkSync(`${__dirname}/Public/${img}`);
    }
  }
  await ProductVariant.deleteMany({ productId: req.params.id });
  await Comment.deleteMany({ productId: req.params.id });
  return res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
export const favorite = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  let isFavorite;
  isFavorite = user.favoriteProductIds.find(
    (item) => item.toString() == req.params.id.toString(),
  );
  if (isFavorite) {
    user.favoriteProductIds = user.favoriteProductIds.filter(
      (item) => item.toString() != req.params.id.toString(),
    );
  } else {
    user.favoriteProductIds.push(req.params.id);
  }
  return res.status(200).json({
    success: true,
    message: isFavorite
      ? "Product Successfully remove from Favorite List"
      : "Product Successfully add from Favorite List",
  });
});
