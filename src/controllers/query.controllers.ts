import Query from "../models/Queries";
import { Request, Response } from "express";

const httpGetQueries = async (req: Request, res: Response) => {
  const queries = await Query.find();
  res.status(200).json({ status: 200, data: queries });
};
const httpPostQueries = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ error: "Request body is missing" });
    return;
  }

  const query = new Query({
    email: req.body.email,
    message: req.body.message,
  });

  await query.save();
  res.status(201).send(query);
};

export { httpGetQueries, httpPostQueries };
