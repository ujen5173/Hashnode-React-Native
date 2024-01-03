import { Request, Response } from "express";
import { Articles } from "../db/schema/index.js";

export type Article = {
  _id: string;
  title: string;
  subtitle: string;
  tags: string[];
  content: string;
  cover_image: string;
  cover_image_key: string;
  read_time: number;
  disabledComments: boolean;
  likesCount: number;
  commentsCount: number;
  readCount: number;
  createdAt: string;
  series: {
    title: string;
    slug: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
};

const getAll = async (req: Request, res: Response) => {
  try {
    const requestType = req.query.type;

    let articles = [];
    if (requestType === "following") {
      // TODO: Get following users after adding following feature
      articles = await Articles.find(
        {},
        "_id title userId subtitle content createdAt tags slug cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount"
      ).populate("user", "_id name username image");
    } else if (requestType === "recent") {
      articles = await Articles.find(
        {},
        "_id title userId subtitle content createdAt tags slug cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount"
      )
        .populate("user", "_id name username image")
        .sort({ createdAt: -1 });
    } else {
      articles = await Articles.find(
        {},
        "_id title userId subtitle content createdAt tags slug cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount"
      )
        .select({})
        .populate("user", "_id name username image")
        .sort({
          likesCount: -1,
          commentsCount: -1,
          readCount: -1,
        });
    }

    res.send({
      success: true,
      error: null,
      data: articles,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

const single = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const article = await Articles.findOne({ slug })
      .populate("user", "_id name username image")
      .populate("series", "_id title slug");

    res.json({
      success: true,
      error: null,
      data: article,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

const multiple = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    const articles = await Articles.find(
      { _id: { $in: ids } },
      "_id title userId subtitle content createdAt tags cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount"
    ).populate("user", "_id name username image");

    res.send({
      success: true,
      error: null,
      data: articles,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

const seedArticles = async (req: Request, res: Response) => {
  try {
    // await Articles.insertMany(articles);
    res.json({
      sucess: true,
      message: "Successfully seeded articles",
    });
  } catch (error) {
    console.log({ error });
  }
};

export { getAll, multiple, seedArticles, single };
