import express from "express";
import {
  httpGetQueries,
  httpPostQueries,
} from "../controllers/query.controllers";
import isqueryvalid from "../middlewares/queryMiddleware";
import { isAdmin } from "../middlewares/authentication";

const queryRouter = express.Router();

queryRouter.get("/", isAdmin, httpGetQueries);
queryRouter.post("/", isqueryvalid, httpPostQueries);

export default queryRouter;
