import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmetCsp from "helmet-csp";
import rateLimit from "express-rate-limit";
import categoryRoute from "./routes/categoryRoute";

const app = express();
const PORT = process.env.PORT || 30001;

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
app.use(morgan("combined")); // Puedes ajustar el formato de registro según tus necesidades

// Usar el enrutador
app.use("/category", categoryRoute);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
