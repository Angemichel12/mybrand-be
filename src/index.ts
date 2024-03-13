import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

mongoose.connect("mongodb://0.0.0.0:27017/acmedb").then(() => {
  const app = express();
  app.use(express.json());

  app.use("/api", routes);

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});
