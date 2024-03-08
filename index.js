import express, { json } from "express";
import mongoose from "mongoose";
import router from "./routes.js";
const app = express();
app.use(json());

mongoose.connect("mongodb://0.0.0.0:27017/acmedb").then(() => {
  app.use(express.json());
  app.use("/api", router);
  app.listen(5000, () => {
    console.log("Server is running on Port:5000");
  });
});
