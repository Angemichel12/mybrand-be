import express from "express";
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

// Create a new blog
router.post("/", isValid, httpCreateBlog);

// Get a single blog by ID
router.get("/:id", httpGetSingleBlog);

// Update a blog by ID
router.patch("/:id", httpUpdateBlog);

// Delete a blog by ID
router.delete("/:id", httpDeleteBlog);

export default router;
