import { User } from "../models/user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const httpRegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(409).json({
        status: 409,
        message: "Email all ready in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: " User created Successfully",
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const httpUserLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Wrong email or password",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      isUserExist.password
    );

    if (!isPasswordMatched) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Incorrect user email or password",
      });
      return;
    }
    const secret_key =
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDc3NTc2MywiaWF0IjoxNzEwNzc1NzYzfQ.aG82xGfRlbTLBUgLynbJTaAiQvzwr5Qr17mDTEW1doY";
    if (!secret_key) {
      throw new Error("secret_key is not defined in the environment variables");
    }
    const token = jwt.sign(
      { _id: isUserExist._id, role: isUserExist.role },
      secret_key,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    res.status(404).json({
      status: 404,
      message: error.message.toString(),
    });
  }
};

export { httpRegisterUser, httpUserLogin };
