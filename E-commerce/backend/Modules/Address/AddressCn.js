import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "./BrandMd.js";
import Product from "../Product/ProductMd.js";
import fs from "fs";
import __dirname from "./../../app.js";
import Address from "./AddressMd.js";
import User from "../User/UserMd.js";
// get all address
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters({
      ...(req.role == "admin" || req.role == "superAdmin"
        ? {}
        : { userId: req.params.id }),
      ...(req.query.search
        ? { title: { $regex: req.query.search, $options: "i" } }
        : {}),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({path:"userId" ,select:"phoneNumber fullName"});
  const result = await feature.execute();
  res.status(200).json(result);
});
// get one address
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : { $and: [{ userId: req.userId }, { _id: req.params.id }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({path:"userId" ,select:"phoneNumber fullName"});
  const result = await feature.execute();
  res.status(200).json(result);
});
//create address
export const create = catchAsync(async (req, res, next) => {
  const address = await Address.create({...req.body,userId:req.userId});
  await User.findByIdAndUpdate(req.userId ,{$push:{addressIds:address._id}})
  return res.status(200).json({
    success: true,
    message: "create address successfully",
    data: address,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
    const {userId=null ,...otherData}=req.body
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
