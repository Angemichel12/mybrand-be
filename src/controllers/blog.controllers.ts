import Blog from "../models/Blog";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";

interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
  file?: any;
}

const httpCreateBlog = async (req: ExpandRequest, res: Response) => {
  if (!req.header("Authorization"))
    return res.status(401).json({ message: "Please sign in" });

  if (!req.UserId) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  if (!req.body) {
    res.status(400).send({ error: "Request body is missing" });
    return;
  }

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({
      status: "failed",
      message: "Please provide an image file",
    });
    return;
  }

  try {
    const result: UploadStream = cloudinaryV2.uploader.upload_stream(
      { folder: "myPortfolio" },
      async (error, cloudinaryResult: any) => {
        if (error) {
          res
            .status(500)
            .json({ status: "failed", message: "Failed to upload image" });
          return;
        }

        const blog = new Blog({
          title: req.body.title,
          content: req.body.content,
          author: req.UserId,
          image: cloudinaryResult.secure_url,
        });

        await blog.save();
        res
          .status(201)
          .json({ message: "blog created successfully", data: blog });
      }
    );

    streamifier.createReadStream(imageFile.buffer).pipe(result);
  } catch (error) {
    res.status(500).json({ status: "failed", message: "An error occurred" });
  }
};

const httpGetBlog = async (req: Request, res: Response) => {
  const blogs = await Blog.find().populate("author", "name");
  res.status(200).json({ message: "success", data: blogs });
};

// const httpPostBlog = async (req: Request, res: Response) => {
//   if (!req.body) {
//     res.status(400).send({ error: "Request body is missing" });
//     return;
//   }

//   const blog = new Blog({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   await blog.save();
//   res.status(201).send(blog);
// };

const httpGetSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      res.status(404).send({ error: "Blog doesn't exist!" });
      return;
    }
    res.status(200).send(blog);
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
    res.status(204).send({ Message: "Blog is deleted successfully" });
  } catch {
    res.status(404).send({ error: "Blog doesn't exist!" });
  }
};

export {
  httpCreateBlog,
  httpDeleteBlog,
  httpGetBlog,
  httpGetSingleBlog,
  // httpPostBlog,
  httpUpdateBlog,
};
