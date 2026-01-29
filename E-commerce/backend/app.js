//Node js part 8 , 9
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { catchError } from "vanta-api";
import { exportValidationData } from "./Middlewares/ExportValidation.js";
import userRouter from "./Modules/User/User.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/upload',express.static(`${__dirname}/Public`))
app.use(exportValidationData);
app.use("/api/users",userRouter)

app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});
app.use(catchError);
export default app;
