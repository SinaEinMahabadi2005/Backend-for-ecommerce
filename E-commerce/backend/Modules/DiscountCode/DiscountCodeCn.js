import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import DiscountCode from "./DiscountCodeMd.js";

// get all
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(DiscountCode, req.query, req.role)
    .addManualFilters(
      req.query.search
        ? { code: { $regex: req.query.search, $options: "i" } }
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
  const feature = new ApiFeatures(DiscountCode, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "userIdsUsed", select: "phoneNumber role fullName" });
  const result = await feature.execute();
  res.status(200).json(result);
});
//create
export const create = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.create(req.body);
  return res.status(200).json({
    success: true,
    message: "create discountCode successfully",
    data: discountCode,
  });
});
//update
export const update = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  return res.status(200).json({
    success: true,
    message: "update discountCode successfully",
    data: discountCode,
  });
});
//remove
export const remove = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.findById(req.params.id);
  if (discountCode.userIdsUsed.length > 0) {
    return next(new HandleERROR("you cant delete this discountCode", 400));
  }
  await DiscountCode.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "discountCode deleted successfully",
  });
});
export const validateCode = (userId, totalPrice, discountCode) => {
  let error = [];
  let now = new Date();
  const userUsed = discountCode.userIdsUsed.filter(
    (item) => item.toString() == userId,
  )?.length;
  if (!discountCode.isPublished) {
    error.push("discount Code unavailable");
  }
  if (discountCode?.minPrice && discountCode.minPrice > totalPrice) {
    error.push(`min total price must be ${discountCode.minPrice} `);
  }
  if (discountCode?.maxPrice && discountCode.maxPrice < totalPrice) {
    error.push(`max total price must be ${discountCode.maxPrice} `);
  }
  if (userUsed >= discountCode.maxUsedCount) {
    error.push("used before");
  } 
if(discountCode.startDate > now || discountCode.endDate < now){
    error.push("unavailable use this time")
}
return {
    success:error.length==0 ?true :false ,
    error
}
};
export const checkCode = catchAsync(async (req, res, next) => {
    
});
