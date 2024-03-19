import app from "./app";
import dotenv from "dotenv";
import { mongoConnect } from "./services/mongos";

dotenv.config();

const startServer = async () => {
  await mongoConnect();

  app.listen(process.env.PORT, () => {
    console.log("server is started");
  });
};

startServer();
