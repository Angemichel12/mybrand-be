import { User } from "../models/user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const httpRegisterUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const { name, email, password } = user;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email all ready in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
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
    const user = req.body;

    const { email, password } = user;

    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    const token = jwt.sign(
      { _id: isUserExist._id, email: isUserExist.email },
      "YOUR_SECRET",
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
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

export { httpRegisterUser, httpUserLogin };
