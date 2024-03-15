import express from "express";

import {
  httpRegisterUser,
  httpUserLogin,
} from "../controllers/user.controllers";

const userRouter = express.Router();
userRouter.post("/", httpRegisterUser);
userRouter.post("/login", httpUserLogin);

export default userRouter;
