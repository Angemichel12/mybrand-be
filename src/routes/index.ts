import express from "express";
import blogRoutes from "./blog.routes";
import commentRoutes from "./comment.routes";

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRoutes);
apiRouter.use("/blogs/:id/comments", commentRoutes);

export default apiRouter;
