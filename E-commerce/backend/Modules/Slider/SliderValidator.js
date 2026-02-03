import { body, param } from "express-validator";
import Slider from "./SliderMd.js";
import mongoose from "mongoose";

/* =======================
   ID PARAM VALIDATOR
======================= */
export const sliderIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid slider id"),
];

/* =======================
   CREATE SLIDER VALIDATOR
======================= */
export const createSliderValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please provide slider title")
    .custom(async (value) => {
      const slider = await Slider.findOne({ title: value });
      if (slider) {
        throw new Error("Slider title must be unique");
      }
      return true;
    }),

  body("image")
    .trim()
    .notEmpty()
    .withMessage("Please provide slider image"),

  body("href")
    .notEmpty()
    .withMessage("Please provide slider link")
    .isURL()
    .withMessage("Slider link must be a valid URL"),

  body("path")
    .trim()
    .notEmpty()
    .withMessage("Please provide slider path"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

/* =======================
   UPDATE SLIDER VALIDATOR
======================= */
export const updateSliderValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slider title cannot be empty")
    .custom(async (value, { req }) => {
      const slider = await Slider.findOne({
        title: value,
        _id: { $ne: req.params.id },
      });
      if (slider) {
        throw new Error("Slider title must be unique");
      }
      return true;
    }),

  body("image")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slider image cannot be empty"),

  body("href")
    .optional()
    .notEmpty()
    .withMessage("Slider link cannot be empty")
    .isURL()
    .withMessage("Slider link must be a valid URL"),

  body("path")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slider path cannot be empty"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];
