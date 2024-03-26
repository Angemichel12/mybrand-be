import express from "express";
import { isUserValid, isUserValidToLogin } from "../middlewares/userMiddleware";

import {
  httpRegisterUser,
  httpUserLogin,
} from "../controllers/user.controllers";

const userRouter = express.Router();
userRouter.post("/signup", isUserValid, httpRegisterUser);
userRouter.post("/login", isUserValidToLogin, httpUserLogin);

export default userRouter;
