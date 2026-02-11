import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import ProductVariant from "./ProductVariantMd.js";
import Product from "../Product/ProductMd.js";
// get all product variant
export const getAll = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(ProductVariant, req, query, req.role)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});
// get one product variant
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(ProductVariant, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate({ path: "variantId" });
  const result = await feature.execute();
  const product = await Product.findById(result.data[0].productId);
  if (!product.isPublished && req.role != "superAdmin" && req.role != "admin") {
    return next(
      new HandleERROR(
        "you can't see this product variant",
        400,
      ),
    );
  }
  return res.status(200).json(result);
});
// create product variant
export const create = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.create(req.body);
  const product = await Product.findById(productVariant.productId);
  if (!product.defaultProductVariantId) {
    product.defaultProductVariantId = productVariant._id;
  }
  product.productVariantIds.push(productVariant._id);
  return res.status(200).json({
    success: true,
    message: "create product variant successfully",
    data: productVariant,
  });
});
// update product variant
export const update = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true, new: true },
  );
  return res.status(200).json({
    success: true,
    message: "update product variant successfully",
    data: productVariant,
  });
});
// remove product variant
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findById(id);
  if (productVariant.boughtCount > 0) {
    return next(
      new HandleERROR(
        "you can't remove this product variant becuse purchased",
        400,
      ),
    );
  }
  const product = await Product.findById(productVariant.productId);
  await ProductVariant.findByIdAndDelete(id);
  if (product.defaultProductVariantId.toString() == id.toString()) {
    product.defaultProductVariantId == product.productVariantIds.length > 0
      ? product.productVariantIds.at(-1)
      : null;
  }
  product.productVariantIds = product.productVariantIds.filter(
    (item) => item._id.toString() != id.toString(),
  );
  await product.save();
  return res.status(200).jaon({
    success: true,
    message: "remove product variant successfully",
  });
});
