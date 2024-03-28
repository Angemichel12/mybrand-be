import { Request, Response, NextFunction } from "express";
import validateQuery from "../validations/query";

const isqueryvalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = validateQuery(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};
export default isqueryvalid;
