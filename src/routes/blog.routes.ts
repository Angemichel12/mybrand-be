import express from "express";
import {
  httpCreateBlog,
  httpDeleteBlog,
  httpGetBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
} from "../controllers/blog.controllers";
import {
  httpGetComment,
  httpCreateComment,
} from "../controllers/comment.controllers";

import {
  httpCreateLike,
  httpGetLikesCount,
} from "../controllers/likes.controllers";
import isValid from "../middlewares/blogMiddleware";
import isCommentValid from "../middlewares/commentMiddleware";
import { isAdmin, isAuthenticate } from "../middlewares/authentication";

const router = express.Router();

// Get all blogs
router.get("/", httpGetBlog);

// Create a new blog
router.post("/", isAdmin, isValid, httpCreateBlog);

// Get a single blog by ID
router.get("/:id", httpGetSingleBlog);

// Update a blog by ID
router.patch("/:id", isAdmin, httpUpdateBlog);

// Delete a blog by ID
router.delete("/:id", isAdmin, httpDeleteBlog);
// add comment of single blog
router.post("/:id/comments", isAuthenticate, isCommentValid, httpCreateComment);
// get all blog comment on single blog
router.get("/:id/comments", httpGetComment);

router.post("/:id/likes", isAuthenticate, httpCreateLike);
router.get("/:id/likes", httpGetLikesCount);

export default router;
