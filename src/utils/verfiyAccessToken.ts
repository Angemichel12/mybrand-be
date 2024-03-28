import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verfiyAccessToken = <T>(data: T) => {
  const secret_key = process.env.secret_key;
  return jwt.verify(String(data), secret_key as string);
};
