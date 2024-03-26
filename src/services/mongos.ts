import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db: string | undefined = process.env.DB_HOST;

if (process.env.NODE_ENV === "test") {
  db = process.env.DB_TEST_HOST;
}

export const ConnectToDb = async (): Promise<void> => {
  if (db !== undefined) {
    try {
      await mongoose.connect(db);
      console.log(`[database] Connected to ${db} database successfully`);
    } catch (error) {
      console.error("[database error] MongoDB connection error:", error);
    }
  }
};
