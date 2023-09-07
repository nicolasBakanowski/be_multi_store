import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import helmetCsp from "helmet-csp";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import categoryRoute from "./routes/categoryRoute";
import orderRoute from "./routes/orderRoute";
import productRoute from "./routes/productRoute";
import userRoute from "./routes/usersRoute";
const app = express();
const PORT = process.env.PORT || 30001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmetCsp());

// Config express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // request limit per IP
});
app.use(limiter);

// Usar morgan para registrar solicitudes
//app.use(morgan("combined"));
// Usar el enrutador
app.use(
  "/uploads/product",
  express.static(path.join(__dirname, "..", "uploads", "product"))
);
app.use(
  "/uploads/category",
  express.static(path.join(__dirname, "..", "uploads", "category"))
);

app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
