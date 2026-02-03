import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import __dirname from "./../../app.js";
import Slider from "./SliderMd.js";
// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Slider, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? {}
        : { isPublished: true },
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
  const feature = new ApiFeatures(Slider, req.query, req.role)
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
  const slider = await Slider.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create slider successfully",
    data: slider,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "update slider successfully",
    data: slider,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const slider = await Slider.findByIdAndDelete(req.params.id);
  if (fs.existsSync(`${__dirname}/Public/${slider.image}`)) {
    fs.unlinkSync(`${__dirname}/Public/${slider.image}`);
  }
  return res.status(200).json({
    success:true ,
    message:"slider deleted successfully"
  })
});
