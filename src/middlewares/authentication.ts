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
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: "401", message: "please login first" });
  }
  try {
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
    const token = req.headers.authorization;
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
