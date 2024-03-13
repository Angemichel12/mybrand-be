import express, { Request, Response } from "express";
import Post from "./models/Post";
const router = express.Router();

// Get all posts
router.get("/posts", async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.send(posts);
});
router.post("/posts", async (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});
router.get("/posts/:id", async (req: Request, res: Response) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.send(post);
});
router.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
router.patch("/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
      return;
    }

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500);
    res.send({ error: "An error occurred while updating the post." });
  }
});

router.delete("/posts/:id", async (req: Request, res: Response) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

export default router;
