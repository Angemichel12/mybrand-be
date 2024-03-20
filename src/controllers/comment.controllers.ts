import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";
import Comment from "../models/comments";

import { JwtPayload } from "jsonwebtoken";

interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
}

const router = express.Router();

const httpCreateComment = async (req: ExpandRequest, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid blog ID");
  }
  console.log(req.UserId);
  if (!req.UserId) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).send("Blog not found");
  }

  const newComment = new Comment({ blog: id, description, author: req.UserId });
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

  res.status(200).json({ status: 20, data: blog });
};

export { httpGetComment, httpCreateComment };
