import { StrictAuthProp } from "@clerk/clerk-sdk-node";
import bodyParser from "body-parser";
import express from "express";
import {
  getAll,
  getArticlesByTag,
  multiple,
  recentActivities,
  seedArticles,
  single,
} from "../controllers/articles.js";
import { getNotifications } from "../controllers/notifications.js";
import { searchTags, singleTag } from "../controllers/tags.js";
import {
  getCurrent,
  getUserById,
  getUserByUsername,
  userArticles,
} from "../controllers/users.js";

const router = express.Router();

// this is for clerk authentication (see docs)
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

router.get("/articles", getAll);
router.get("/articles/tag/:slug", getArticlesByTag);
router.post("/articles/multiple", bodyParser.json(), multiple);
router.post("/articles/seed", bodyParser.json(), seedArticles);
router.get("/articles/:slug", single);

router.get("/users/get-current", getCurrent);
router.get("/users/id/:userId", getUserById);
router.get("/users/clerk/id/:userId", getCurrent);
router.get("/users/username/:username", getUserByUsername);
router.get("/users/articles/:userId", userArticles);
router.get("/users/articles/recent_activities/:username", recentActivities);

router.get("/tags", searchTags);
router.get("/tags/:slug", singleTag);

router.post("/notifications", bodyParser.json(), getNotifications);

export default router;
