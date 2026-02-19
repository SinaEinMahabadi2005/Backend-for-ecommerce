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
// change publish
export const changePublish = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  comment.isPublished = !comment.isPublished;
  const newComment = await comment.save();
  return res.status(200).json({
    success: true,
    message: "comment brand successfully",
    data: newComment,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({ replyTo: req.params.id });
  return res.status(200).json({
    success: true,
    message: "comment deleted successfully",
  });
});
// reply
export const reply = catchAsync(async (req, res, next) => {
  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
    isReply: true,
    isPublished: true,
    isBought:false
  });
  return res.status(200).json({
    success: true,
    message: "reply comment created successfully",
    data:comment
  });
});