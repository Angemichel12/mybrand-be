import Like from "../models/likes";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Blog from "../models/Blog";

interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
}

const httpCreateLike = async (req: ExpandRequest, res: Response) => {
  try {
    const blogId = req.params.id;
    const user = req.UserId;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(400).send("Blog not found");
    }

    const existingLike = await Like.findOne({ user, blogId });

    if (existingLike) {
      await Like.findOneAndDelete({ user, blogId });
      await Blog.findByIdAndUpdate(blogId, {
        $pull: { likes: existingLike._id },
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Like removed successfully",
      });
    } else {
      const newLike = new Like({
        user,
        blogId,
      });

      const blogLike = await newLike.save();
      blog.likes.push(blogLike._id);
      await blog.save();

      res.status(201).json({
        status: 201,
        success: true,
        message: "Like created successfully",
        like: newLike,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};
const httpGetLikesCount = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    const likesCount = await Like.countDocuments({ blogId });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Likes count fetched successfully",
      likesCount,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

export { httpCreateLike, httpGetLikesCount };
