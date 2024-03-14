import express from "express";

import httpRegisterUser from "../controllers/user.controllers";

const userRouter = express.Router();
userRouter.post("/", httpRegisterUser);

export default userRouter;
