import express from "express";
import isUserValid from "../middlewares/userMiddleware";

import {
  httpRegisterUser,
  httpUserLogin,
} from "../controllers/user.controllers";

const userRouter = express.Router();
userRouter.post("/", isUserValid, httpRegisterUser);
userRouter.post("/login", httpUserLogin);

export default userRouter;
