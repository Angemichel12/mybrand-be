import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";
import Comment from "../models/comments";

const router = express.Router();

const httpCreateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid blog ID");
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  const newComment = new Comment({ user, comment });
  await newComment.save();

  blog.comments.push(newComment._id);
  await blog.save();

  res.status(201).send(newComment);
};
const httpGetComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid blog ID");
  }

  const blog = await Blog.findById(id).populate("comments");

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  res.status(200).send(blog.comments);
};

export { httpGetComment, httpCreateComment };
