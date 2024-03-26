import { type Express } from "express";
import swaggerUI from "swagger-ui-express";
import swagger from "../config/swagger";

export const addDocumentation = (app: Express): void => {
  app.use("/doc", swaggerUI.serve, swaggerUI.setup(swagger));
};
