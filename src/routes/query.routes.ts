import express from "express";
import {
  httpGetQueries,
  httpPostQueries,
} from "../controllers/query.controllers";
import isqueryvalid from "../middlewares/queryMiddleware";

const queryRouter = express.Router();

queryRouter.get("/", httpGetQueries);
queryRouter.post("/", isqueryvalid, httpPostQueries);

export default queryRouter;
