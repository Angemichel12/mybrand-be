import express from "express";
import Post from "./models/post.js";

const router = express.Router();
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});
router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});
export default router;
