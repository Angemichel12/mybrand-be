import express, { Request, Response } from "express";
import {
  httpCreateBlog,
  httpDeleteBlog,
  httpGetBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
} from "../controllers/blog.controllers";
import isValid from "../middlewares/blogMiddleware";
const router = express.Router();

// Get all blogs
router.get("/", httpGetBlog);
router.post("/", isValid, httpCreateBlog);
// router.get("/blogs/:id", async (req: Request, res: Response) => {
//   const blog = await Blog.findOne({ _id: req.params.id });
//   res.send(blog);
// });
router.get("/:id", httpGetSingleBlog);
router.patch("/:id", httpUpdateBlog);

router.delete("/:id", httpDeleteBlog);

export default router;
