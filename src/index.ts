import app from "./app";
import { mongoConnect } from "./services/mongos";

const startServer = async () => {
  await mongoConnect();

  app.listen(5000, () => {
    console.log("server is listening ..... 5000");
  });
};

startServer();
