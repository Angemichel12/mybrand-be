import Like from "../models/likes";
import { Request, Response } from "express";

const httpCreateLike = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const userEmail = req.body.email;

    const existingLike = await Like.findOne({ userEmail, blogId });

    if (existingLike) {
      await Like.findOneAndDelete({ userEmail, blogId });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Like removed successfully",
      });
    } else {
      const newLike = new Like({
        userEmail,
        blogId,
      });

      await newLike.save();

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
