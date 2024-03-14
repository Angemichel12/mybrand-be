import express from "express";
import {
  httpGetQueries,
  httpPostQueries,
} from "../controllers/query.controllers";

const queryRouter = express.Router();

queryRouter.get("/", httpGetQueries);
queryRouter.post("/", httpPostQueries);

export default queryRouter;
