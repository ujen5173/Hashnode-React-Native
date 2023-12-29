import { Request, Response } from "express";
import { Articles } from "../db/schema/index.js";

const getAll = async (req: Request, res: Response) => {
  try {
    const articles = await Articles.find({});
    res.send({
      sucess: true,
      message: "Successfully fetched articles",
      data: articles,
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: "Failed to fetch articles",
      error: "Internal server error",
    });
  }
};

export { getAll };
