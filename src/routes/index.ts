import express from "express";
import blogRoutes from "./blog.routes";
import queryRouter from "./query.routes";
// import commentRoutes from "./comment.routes";
import userRouter from "./user.routes";

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRoutes);
apiRouter.use("/queries", queryRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
