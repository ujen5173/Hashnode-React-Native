import { Request, Response } from "express";
import Article from "../db/schema/articles.js";
import { Comments } from "../db/schema/index.js";

const getComments = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { userId } = req.query;

    const article = await Article.findOne({ slug }, "_id");

    if (!article) {
      return res.json({
        success: false,
        error: "Article not found!",
        data: null,
      });
    }

    const comments = await Comments.find({
      article: article._id,
      parent: null,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "name username image tagline _id",
      })
      .select("-article -updatedAt")
      .populate({
        path: "children",
        select: "-article -updatedAt",

        populate: [
          {
            path: "user",
            select: "name username image tagline _id",
          },
          {
            path: "likes",
            match: {
              _id: userId,
            },
            select: "_id",
          },
          {
            path: "children",
            select: "-article -updatedAt",

            populate: [
              {
                path: "user",
                select: "name username image tagline _id",
              },
              {
                path: "likes",
                match: {
                  _id: userId,
                },
                select: "_id",
              },
            ],
          },
        ],
      });

    return res.json({
      success: true,
      error: null,
      data: comments,
    });
  } catch (error) {
    console.log({ error });
    return res.json({
      success: false,
      error: "Internal server error",
      data: null,
    });
  }
};

const newComment = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const { slug } = req.params;
    const { content, type, parent } = req.body;

    const article = await Article.findOne({ slug }, "_id");

    if (!article) {
      return res.json({
        success: false,
        error: "Article not found!",
        data: null,
      });
    }

    const newData = await Comments.create({
      article: article._id,
      content,
      user: userId,
      type,
      parent,
    });

    if (!newData) {
      return res.json({
        success: false,
        error: "Error creating comment!",
        data: null,
      });
    }

    if (parent) {
      await Comments.findOneAndUpdate(
        {
          _id: parent,
        },
        {
          $push: {
            children: newData._id,
          },
        }
      );
    }

    const newCommentData = await Article.findOneAndUpdate(
      {
        _id: article._id,
      },
      {
        $inc: {
          commentsCount: 1,
        },
        $push: {
          comments: newData._id,
        },
      }
    );

    return res.json({
      success: true,
      error: null,
      data: newCommentData,
    });
  } catch (err) {
    console.log({ err });
    return res.json({
      success: false,
      error: "Internal server error",
      data: null,
    });
  }
};

const likeComment = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { commentId } = req.params;

    const hasLiked = await Comments.findOne({
      _id: commentId,
    }).populate({
      path: "likes",
      match: {
        path: "likes",
        model: "user",
        match: {
          _id: userId,
        },
        select: "_id",
      },
    });

    if (!hasLiked) {
      return res.json({
        success: false,
        error: "Internal server error",
        data: null,
      });
    }

    const comment = await Comments.findOneAndUpdate(
      {
        _id: commentId,
      },
      {
        $inc: {
          likesCount: (hasLiked?.likes ?? []).length > 0 ? -1 : 1,
        },
        $push: {
          likes: userId,
        },
      }
    );

    if (!comment) {
      return res.json({
        success: false,
        error: "Internal server error",
        data: null,
      });
    }

    return res.json({
      success: true,
      error: null,
      data: comment,
    });
  } catch (error) {
    console.log({ error });
    return res.json({
      success: false,
      error: "Internal server error",
      data: null,
    });
  }
};

export { getComments, likeComment, newComment };
