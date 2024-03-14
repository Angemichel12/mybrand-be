import { Request, Response, NextFunction } from "express";
import validateComment from "../validations/comment";

const isCommentValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = validateComment(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

export default isCommentValid;
