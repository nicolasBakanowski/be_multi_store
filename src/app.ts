import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "path";
import helmetCsp from "helmet-csp";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import categoryRoute from "./routes/categoryRoute";
import orderRoute from "./routes/orderRoute";
import productRoute from "./routes/productRoute";
import userRoute from "./routes/usersRoute";
import statusRoute from "./routes/statusRoute";
import orderSocket from "./sockets/orderSocket";
import * as dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 30001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

app.use(helmet());

// Configuración específica de CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(compression());
app.use(helmetCsp());

const server = createServer(app);
dotenv.config();

const io = new Server(server, {
  cors: {
    //origin: [process.env.IPLOCALHOST || "", process.env.IPCLIENTHOST || ``],
    credentials: true,
  },
});

// Config express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // request limit per IP
});

app.use(limiter);

app.use(
  "/dist/uploads/product/",
  express.static(path.join(__dirname, "..", "uploads", "product"))
);
app.use(
  "/dist/uploads/category/",
  express.static(path.join(__dirname, "..", "uploads", "category"))
);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "¡La prueba fue exitosa!" });
});

// Manejar OPTIONS pre-flight
app.options("*", cors());

app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/status", statusRoute);

orderSocket(io);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export { io };
