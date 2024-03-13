import mongoose from "mongoose";

mongoose.connection.on("open", () => {
  console.info("Database connected");
});

mongoose.connection.on("close", () => {
  console.info("something went wrong");
});

const mongoConnect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/acmedb");
};
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export { mongoConnect, mongoDisconnect };
