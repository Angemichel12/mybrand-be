import Blog from "../models/Blog";
import { Request, Response } from "express";

const httpCreateBlog = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ error: "Request body is missing" });
    return;
  }

  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  await blog.save();
  res.status(201).send(blog);
};

const httpGetBlog = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

const httpPostBlog = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ error: "Request body is missing" });
    return;
  }

  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  await blog.save();
  res.status(201).send(blog);
};

const httpGetSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      res.status(404).send({ error: "Blog doesn't exist!" });
      return;
    }
    res.send(blog);
  } catch {
    res.status(404).send({ error: "Blog doesn't exist!" });
  }
};

const httpUpdateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (!blog) {
      res.status(404).send({ error: "Blog doesn't exist!" });
      return;
    }

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    await blog.save();
    res.send(blog);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the post." });
  }
};

const httpDeleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404).send({ error: "Blog doesn't exist!" });
  }
};

export {
  httpCreateBlog,
  httpDeleteBlog,
  httpGetBlog,
  httpGetSingleBlog,
  httpPostBlog,
  httpUpdateBlog,
};
