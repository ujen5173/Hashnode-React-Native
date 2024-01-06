import { Request, Response } from "express";
import Tag from "../db/schema/tags.js";

const searchTags = async (req: Request, res: Response) => {
  const { q } = req.query;
  const tags = await Tag.find({ name: { $regex: q as string, $options: "i" } });
  res.json(tags);
};

const singleTag = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const tag = await Tag.findOne({
      slug: {
        $regex: slug,
        $options: "i",
      },
    });

    res.json({
      data: tag,
      error: null,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "err.message" });
  }
};

export { searchTags, singleTag };
