import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connection.on("open", () => {
  console.info("Database connected");
});

mongoose.connection.on("close", () => {
  console.info("something went wrong");
});

const mongoConnect = async () => {
  const dbHost = process.env.DB_HOST;
  if (!dbHost) {
    throw new Error("DB_HOST is not defined in the environment variables");
  }
  await mongoose.connect(dbHost);
};
const mongoConnectTest = async () => {
  const DB_TEST_HOST = process.env.DB_TEST_HOST;
  if (!DB_TEST_HOST) {
    throw new Error("DB_HOST is not defined in the environment variables");
  }
  await mongoose.connect(DB_TEST_HOST);
};
const mongoDisconnectTest = async () => {
  await mongoose.disconnect();
};
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export { mongoConnect, mongoDisconnect, mongoConnectTest, mongoDisconnectTest };
