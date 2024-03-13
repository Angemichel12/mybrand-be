import { Request, Response, NextFunction } from "express";
import validateBlog from "../validations/blog";

const isValid = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = validateBlog(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};
export default isValid;
