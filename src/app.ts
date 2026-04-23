import dotenv from "dotenv";

dotenv.config();

import { validateEnv } from "./config/env";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "path";
import helmetCsp from "helmet-csp";
import bodyParser from "body-parser";
import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import categoryRoute from "./routes/categoryRoute";
import orderRoute from "./routes/orderRoute";
import productRoute from "./routes/productRoute";
import brandRoute from "./routes/brandRoute";
import userRoute from "./routes/usersRoute";
import statusRoute from "./routes/statusRoute";
import earningRoute from "./routes/earningRoute";
import orderSocket from "./sockets/orderSocket";
import lotteryRoute from "./routes/lotteryRoute";
import setupSwaggerDocs from "./config/swaggerConfig";
import { getCorsOrigins } from "./corsConfig";
import { setIo } from "./socket/ioSingleton";
import { globalApiLimiter } from "./config/rateLimit";
import { errorHandler } from "./middleware/errorHandler";
import analyticsRoute from "./routes/analyticsRoute";

validateEnv();

const UPLOAD_ROOT = path.resolve(__dirname, "uploads");

const app = express();
const logger = pino({
  level:
    process.env.NODE_ENV === "test"
      ? "silent"
      : process.env.LOG_LEVEL || "info",
});

const PORT = process.env.PORT || 30001;
const corsOrigins = getCorsOrigins();
const corsOptions: cors.CorsOptions = {
  origin: corsOrigins,
  credentials: true,
};

setupSwaggerDocs(app);

app.use((req, res, next) => {
  const id = randomUUID();
  (req as express.Request & { id?: string }).id = id;
  res.setHeader("x-request-id", id);
  next();
});

app.use(
  pinoHttp({
    logger,
    genReqId: (req) =>
      (req as express.Request & { id?: string }).id || randomUUID(),
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());
app.use(helmetCsp());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigins,
    credentials: true,
  },
});

setIo(io);
orderSocket(io);

app.use(globalApiLimiter);

function mountApiRoutes(r: express.Router) {
  r.use("/category", categoryRoute);
  r.use("/product", productRoute);
  r.use("/brand", brandRoute);
  r.use("/user", userRoute);
  r.use("/order", orderRoute);
  r.use("/status", statusRoute);
  r.use("/earning", earningRoute);
  r.use("/analytics", analyticsRoute);
  r.use("/lotery", lotteryRoute);
  r.use("/lottery", lotteryRoute);
}

mountApiRoutes(app);
const v1 = express.Router();
mountApiRoutes(v1);
app.use("/api/v1", v1);

app.use(
  "/dist/uploads/product/",
  express.static(path.join(UPLOAD_ROOT, "product"))
);
app.use(
  "/dist/uploads/category/",
  express.static(path.join(UPLOAD_ROOT, "category"))
);
app.use(
  "/dist/uploads/brand/",
  express.static(path.join(UPLOAD_ROOT, "brand"))
);

app.get("/test", (_req, res) => {
  res.status(200).json({ message: "¡La prueba fue exitosa!" });
});

app.options("*", cors(corsOptions));

app.use(errorHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    logger.info({ dirname: __dirname, port: PORT }, "Servidor escuchando");
  });
}

export { io, app, server };
