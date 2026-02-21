import ApiFeatures, { catchAsync } from "vanta-api";
import Cart from "./CartMd.js";

export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Cart, req.query, req.role)
    .addManualFilters({ userId: req.userId })
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate({
      path: "items",
      populate: [
        {
          path: "productId",
          select: "title images ratingCount avrageRating",
        },
        {
          path: "productVariantId",
          select: "price priceAfterDiscount discountPercent quantity variantId",
          populate: { path: "variantId" },
        },
        {
          path: "categoryId",
          select: "title",
        },
        {
          path: "brandId",
          select: "title",
        },
      ],
    });
  const result = await feature.execute();
  let newTotalPrice = 0;
  let newTotalPriceAfterDiscount = 0;
  let change = false;
  const cart = result.data[0];
  let newCart = cart;
  newCart.items = newCart.items?.filter((item) => {
    item.categoryId = item.categoryId._id;
    item.brandId = item.brandId._id;
    if (item.quantity > item.productVariantId.quantity) {
      change = true;
      item.quantity = item.productVariantId.quantity;
      if (item.quantity == 0) {
        return false;
      }
    }
    newTotalPrice += item.quantity * item.productVariantId.price;
    newTotalPriceAfterDiscount +=
      item.productVariantId.newTotalPriceAfterDiscount;
    item.productVariantId = item.productVariantId._id;
    item.productId = item.productId._id;
    return item;
  });
  if (
    newCart.totalPrice != newTotalPrice ||
    newCart.totalPriceAfterDiscount != newTotalPriceAfterDiscount
  ) {
    change = true;
    newCart.totalPrice = newTotalPrice;
    newCart.totalPriceAfterDiscount = newTotalPriceAfterDiscount;
  }
  let cartResult;
  if (change) {
    cartResult = await Cart.findByIdAndUpdate(cart._id, newCart, {
      new: true,
    }).populate({
      path: "items",
      populate: [
        {
          path: "productId",
          select: "title images ratingCount avrageRating",
        },
        {
          path: "productVariantId",
          select: "price priceAfterDiscount discountPercent quantity variantId",
          populate: { path: "variantId" },
        },
        {
          path: "categoryId",
          select: "title",
        },
        {
          path: "brandId",
          select: "title",
        },
      ],
    });
  } else {
    cartResult = cart;
  }
  return res.status(200).json({
    success: true,
    data: cartResult,
  });
});
