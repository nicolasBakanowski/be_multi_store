import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { getEnv } from "./env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Multi Store",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app: Express) => {
  const env = getEnv();
  const enabled =
    env.NODE_ENV !== "production" || env.SWAGGER_ENABLED === true;
  if (!enabled) {
    return;
  }
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerDocs;
