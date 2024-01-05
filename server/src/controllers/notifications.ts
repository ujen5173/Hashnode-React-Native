import { Request, Response } from "express";
import { Notifications } from "../db/schema/index.js";
import User from "../db/schema/users.js";

const getNotifications = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findOne({ userId }, "_id");
  const notifications = await Notifications.find({})
    .select("_id body type slug title articleAuthor createdAt")
    .populate("from", {
      _id: 1,
      name: 1,
      username: 1,
      image: 1,
    })
    .where("from")
    .equals(user?._id);

  res.json({
    data: notifications,
    success: true,
    error: null,
  });
};

export { getNotifications };
