import { Request, Response } from "express";
import { Users } from "../db/schema/index.js";

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

export { getCurrent, getUserByUsername };
