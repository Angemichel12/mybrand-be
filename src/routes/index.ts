import express from "express";
import blogRoutes from "./blog.routes";

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRoutes);

export default apiRouter;
