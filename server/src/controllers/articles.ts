import { Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../db/schema/articles.js";
import { Articles } from "../db/schema/index.js";
import User from "../db/schema/users.js";
import { Activity, refactorActivityHelper } from "../helpers/activity.js";

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
  likes: { _id: string }[];
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
    const { requestType, userId } = req.query;

    const requiredFields =
      "_id title userId subtitle content createdAt tags slug cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount";

    let populateOptions: mongoose.PopulateOptions[] = [];

    const user = await User.findOne({ _id: userId }).select("userId");

    if (userId !== undefined) {
      populateOptions.push({
        path: "likes",
        match: { userId: user?.userId },
        select: "_id",
      });
    }

    let articles = [];
    if (requestType === "following") {
      // TODO: Get following users after adding following feature
      articles = await Articles.find({}, requiredFields)
        .populate("user", "_id name username image")
        .populate(populateOptions);
    } else if (requestType === "recent") {
      articles = await Articles.find({}, requiredFields)
        .populate("user", "_id name username image")
        .populate(populateOptions)
        .sort({ createdAt: -1 });
    } else {
      articles = await Articles.find({}, requiredFields)
        .select({})
        .populate("user", "_id name username image")
        .populate(populateOptions)
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

const getArticlesByTag = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const articles = await Articles.find({
      tags: { $in: [slug] },
    })
      .select(
        "_id title userId subtitle content createdAt tags cover_image cover_image_key read_time disabledComments likesCount commentsCount readCount"
      )
      .populate("user", "_id name username image");

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

const recentActivities = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("_id");

    if (!user)
      return res.json({
        success: false,
        error: "User not found",
        data: null,
      });

    const articles = await Articles.find(
      {
        user: user._id,
      },
      "_id title userId createdAt slug"
    ).sort({
      createdAt: -1,
    });

    const newActivities = articles.map((e) => ({
      _id: e._id.toString(),
      title: e.title,
      slug: e.slug,
      createdAt: e.createdAt,
      activity_type: "ARTICLE",
    })) as Activity[];

    const refactoredActivities = refactorActivityHelper([
      ...newActivities,
      {
        _id: "0001",
        title: "Joined Hashnode Clone",
        slug: "",
        createdAt: user?.createdAt,
        activity_type: "JOINED",
      },
    ]);

    return res.json({
      data: Array.from(refactoredActivities),
      success: true,
      error: null,
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

const like = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { sessionUser } = req.body;

    const article = await Article.findOne({
      slug,
    })
      .select("_id title likesCount")
      .populate("user", "_id username")
      .populate({
        path: "likes",
        model: "user",
        match: {
          _id: sessionUser,
        },
        select: "_id",
      });

    if (!article) {
      return res.json({
        success: false,
        error: "Internal server error",
        data: null,
      });
    }

    if (article.likes.length > 0) {
      await Article.findOneAndUpdate(
        {
          slug,
        },
        {
          $inc: {
            likesCount: -1,
          },
          $pull: {
            likes: sessionUser,
          },
        }
      );

      return res.json({
        success: true,
        error: null,
        data: "ok",
      });
    } else {
      await Article.findOneAndUpdate(
        {
          slug,
        },
        {
          $inc: {
            likesCount: 1,
          },
          $push: {
            likes: sessionUser,
          },
        }
      );

      return res.json({
        success: true,
        error: null,
        data: "ok",
      });
    }
  } catch (error) {
    console.log({ error });
    return res.json({
      success: false,
      error: "Internal server error",
      data: null,
    });
  }
};

export {
  getAll,
  getArticlesByTag,
  like,
  multiple,
  recentActivities,
  seedArticles,
  single,
};
