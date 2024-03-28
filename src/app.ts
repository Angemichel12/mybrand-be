import express, { Express, Request, Response } from "express";
import apiRouter from "./routes/index";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import "dotenv/config";
import { ConnectToDb } from "./services/mongos";
import { getPort } from "./services/getPort";
import { addDocumentation } from "./services/docs";

const app: Express = express();

let port = getPort();

if (process.env.NODE_ENV === "test") {
  port = Math.floor(Math.random() * 60000) + 5000;
}

ConnectToDb();

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());

app.use("/api/v1", apiRouter);
addDocumentation(app);
app.use("/api/v1", (req, res) => {
  res.status(200).json({ message: "Welcome to the blog API" });
});

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { server };
