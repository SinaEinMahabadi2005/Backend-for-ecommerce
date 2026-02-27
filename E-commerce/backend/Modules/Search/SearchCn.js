import { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Product/ProductMd.js";
import Brand from "../Brand/BrandMd.js";
import Category from "../Category/CategoryMd.js";

export const search = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return next(new HandleERROR("search muset be fill", 400));
  }
  const products = await Product.find({ title: { $regex: q, options: "i" },isPublished:true })
    .sort("-createdAt")
    .limit(10)
    .select("images title");
  const brands = await Brand.find({ title: { $regex: q, options: "i" },isPublished:true })
    .sort("-createdAt")
    .limit(10)
    .select("images title");
  const categories = await Category.find({ title: { $regex: q, options: "i" },isPublished:true })
    .sort("-createdAt")
    .limit(10)
    .select("images title");
  if (products.length == 0 && brands.length == 0 && categories.length == 0) {
    return next(new HandleERROR("search muset be fill", 400));
  }
  return res.status(200).json({
    success: true,
    data: {
      categories,
      products,
      brands,
    },
  });
});
