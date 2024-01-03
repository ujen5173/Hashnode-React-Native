import { Request, Response } from "express";
import Tag from "../db/schema/tags.js";

const searchTags = async (req: Request, res: Response) => {
  const { q } = req.query;
  const tags = await Tag.find({ name: { $regex: q as string, $options: "i" } });
  res.json(tags);
};

export { searchTags };
