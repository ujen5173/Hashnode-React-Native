import { Request, Response } from "express";
import { Articles, Users } from "../db/schema/index.js";

const getCurrent = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Users.findOne(
      { userId: userId },
      "_id username name email image"
    );

    if (!user) {
      return res.json({
        sucess: false,
        message: "User not found",
        data: null,
      });
    }

    res.json({
      sucess: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error({ error });
    res.send({
      sucess: false,
      message: "Failed to fetch user",
      error: "Internal server error",
    });
  }
};

const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.json({
        sucess: false,
        message: "User not found",
        data: null,
      });
    }

    res.json({
      sucess: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error({ error });
    res.send({
      sucess: false,
      message: "Failed to fetch user",
      error: "Internal server error",
    });
  }
};

const userArticles = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const articles = await Articles.find({ user: userId }).select(
    "_id title content createdAt read_time readCount cover_image"
  );

  res.json({
    sucess: true,
    message: "User articles fetched successfully",
    data: articles,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await Users.findById(userId).select(
    "_id username name email image followersCount followingCount social"
  );

  if (!user) {
    return res.json({
      sucess: false,
      message: "User not found",
      data: null,
    });
  }

  res.json({
    sucess: true,
    message: "User fetched successfully",
    data: user,
  });
};

export { getCurrent, getUserById, getUserByUsername, userArticles };
