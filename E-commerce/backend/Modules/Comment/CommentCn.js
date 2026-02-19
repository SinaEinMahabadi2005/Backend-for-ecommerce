import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "./BrandMd.js";
import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
import Comment from "./CommentMd.js";
import User from "../User/UserMd.js";
// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Comment, req.query, req.role)
    .addManualFilters()
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "fullName phoneNumber role" },
      { path: "productId", select: "title" },
    ]);
  const result = await feature.execute();
  res.status(200).json(result);
});
// get one
export const getAllCommentPost = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Comment, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { productId: req.params.id }
        : { $and: [{ isPublished: true }, { productId: req.params.id }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "fullName phoneNumber role" },
      { path: "productId", select: "title" },
    ]);
  const result = await feature.execute();
  res.status(200).json(result);
});
//create
export const create = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  let isBought = user.boughtProductIds.find(
    (item) => item._id.toString() == req.body.productId.toString(),
  )
    ? true
    : false;
  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
    isReply: false,
    isPublished: false,
    isBought,
  });
  if (req.body.rate && isBought) {
    const product = await Product.findById(comment.productId);
    product.avrageRate =
      (product.avrageRate * product.ratingCount + req.body.rate) /
      (product.ratingCount + 1);
    product.ratingCount++;
    await product.save();
  }
  return res.status(200).json({
    success: true,
    message: "comment brand successfully",
    data: comment,
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
