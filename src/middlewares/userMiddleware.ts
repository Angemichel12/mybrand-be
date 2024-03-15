import { Request, Response, NextFunction } from "express";

import validateUser from "../validations/user";

const isUserValid = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

export default isUserValid;
