import express from "express";
import blogRoutes from "./blog.routes";
import queryRouter from "./query.routes";
// import commentRoutes from "./comment.routes";

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRoutes);
apiRouter.use("/queries", queryRouter);

export default apiRouter;
