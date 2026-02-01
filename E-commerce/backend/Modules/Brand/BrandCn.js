import ApiFeatures, { catchAsync } from "vanta-api";
import Brand from "./BrandMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Brand, req.query, req.role)
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
