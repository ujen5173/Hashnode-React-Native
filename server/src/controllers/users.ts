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
        success: false,
        message: "User not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error({ error });
    res.send({
      success: false,
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
        success: false,
        message: "User not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error({ error });
    res.send({
      success: false,
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
    success: true,
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
      success: false,
      message: "User not found",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

const profile = async (req: Request, res: Response) => {
  const { userId } = req.query;
  console.log({ userId });

  const user = await Users.findById(userId).select({
    name: 1,
    image: 1,
    email: 1,
    bio: 1,
    available: 1,
    skills: 1,
    tagline: 1,
    location: 1,
    social: 1,
    username: 1,
  });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error({ error });
    res.send({
      success: false,
      message: "Failed to update user",
      error: "Internal server error",
    });
  }
};

export {
  getCurrent,
  getUserById,
  getUserByUsername,
  profile,
  updateProfile,
  userArticles,
};
