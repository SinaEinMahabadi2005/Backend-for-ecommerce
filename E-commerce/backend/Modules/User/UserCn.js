import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./UserMd.js";
// get all user
export const getAll = catchAsync(async (req, res, next) => {
  const { search = null } = req.query;
  const feature = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
      search ? { phoneNumber: { $regex: search, $options: "i" } } : {}
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});
// get one user
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
      req.role == "user" ? { _id: req.userId } : { _id: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});
//update
export const update = catchAsync(async (req, res, next) => {
  const { role = null, isActive = "null", fullName = null } = req.body;
  const { id } = req.params;
  if (req.role == "user" && id.toString() != req.userId.toString()) {
    return next(
      new HandleERROR("you don't have permission for update this account")
    );
  }
  const user = await User.findById(id);
  if(req.role=="admin" && id.toString()!=req.userId.toString() &&(user.role=="admin" || user.role=="superAdmin")){
     new HandleERROR("you don't have permission for update this account")
  }
  if (req.role != "user") {
    user.isActive = isActive == "null" ? user.isActive : isActive;
  }
  if (req.role == "superAdmin") {
    user.role = role || user.role;
  }
  user.fullName = fullName || user.fullName;
  const newUser = await user.save();
  return res.status(200).json({
    success: true,
    message: "user update successfully",
    data: newUser,
  });
});
