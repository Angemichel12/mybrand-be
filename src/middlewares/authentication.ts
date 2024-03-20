import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verfiyAccessToken } from "../utils/verfiyAccessToken";
import dotenv from "dotenv";
dotenv.config();

interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
}

const isAdmin = async (
  req: ExpandRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.header("Authorization"))
      return res.status(401).json({ message: "Please sign in" });
    const token = req.header("Authorization")?.split(" ")[1] as string;
    // const verfiyAccessToken = <T>(data: T) => {
    //   const secret_key = process.env.secret_key;
    //   return jwt.verify(String(data), secret_key as string);
    // };
    const decoded = verfiyAccessToken(token) as JwtPayload;
    if (decoded) {
      req.UserId = decoded._id;
      const id = req.UserId;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      if (user.role !== "admin") {
        return res.status(406).json({ message: "Ony for Admin" });
      }
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "400", message: "Bad Request" });
  }
};

const isAuthenticate = async (
  req: ExpandRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // const verfiyAccessToken = <T>(data: T) => {
    //   const secret_key = process.env.secret_key;
    //   return jwt.verify(String(data), secret_key as string);
    // };
    if (!req.header("Authorization"))
      return res.status(401).json({ message: "Please sign in" });
    const token = req.header("Authorization")?.split(" ")[1] as string;

    // Check if token exists and is a valid JWT
    if (!token || token.split(".").length !== 3) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decoded = verfiyAccessToken(token) as JwtPayload;
    if (decoded) {
      req.UserId = decoded._id;
      const id = req.UserId;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "400", message: "Bad Request" });
  }
};

export { isAdmin, isAuthenticate };
