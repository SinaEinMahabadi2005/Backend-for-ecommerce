import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "../Brand/BrandMd.js";

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
    .populate({ path: "userId", select: "phoneNumber fullName" });
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
    .populate({ path: "userId", select: "phoneNumber fullName" });
  const result = await feature.execute();
  res.status(200).json(result);
});
//create address
export const create = catchAsync(async (req, res, next) => {
  const address = await Address.create({ ...req.body, userId: req.userId });
  await User.findByIdAndUpdate(req.userId, {
    $push: { addressIds: address._id },
  });
  return res.status(200).json({
    success: true,
    message: "create address successfully",
    data: address,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const { userId = null, ...otherData } = req.body;
  const address = await Address.findById(req.params.id);
  if (
    address.userId != req.params.id &&
    req.role != "admin" &&
    req.role != "superAdmin"
  ) {
    return next(new HandleERROR("you don't have permission", 400));
  }
  const newAddress = await Address.findByIdAndUpdate(req.params.id, otherData, {
    runValidator: true,
    new: true,
  });
  return res.status(200).json({
    success: true,
    message: "update Address successfully",
    data: newAddress,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
   const address = await Address.findById(req.params.id);
  if (
    address.userId != req.params.id &&
    req.role != "admin" &&
    req.role != "superAdmin"
  ) {
    return next(new HandleERROR("you don't have permission", 400));
  }
  await Address.findByIdAndDelete(req.params.id)
  await User.findByIdAndUpdate(address.userId,{$pull:{addressIds:address._id}})
  return res.status(200).json({
    success: true,
    message: "address deleted successfully",
    data:address
  });
});
