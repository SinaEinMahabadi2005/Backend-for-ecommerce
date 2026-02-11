//Node js part 8 , 9
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { catchError } from "vanta-api";
import { exportValidationData } from "./Middlewares/ExportValidation.js";
import userRouter from "./Modules/User/User.js";
import authRouter from "./Modules/Auth/Auth.js";
import brandRouter from "./Modules/Brand/Brand.js";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpace } from "./Utils/Swagger.js";
import sliderRouter from "./Modules/Slider/Slider.js";
import categoryRouter from "./Modules/Category/Category.js";
import variantRouter from "./Modules/Variant/Variant.js";
import productVariantRouter from "./Modules/ProductVariant/ProductVariant.js";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use("/upload", express.static(`${__dirname}/Public`));
app.use(exportValidationData);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/brands", brandRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpace));
app.use("/api/sliders", sliderRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/variants", variantRouter);
app.use("/api/product-variant", productVariantRouter);


app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});
app.use(catchError);
export default app;
