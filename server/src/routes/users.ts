import express from "express";
import { recentActivities } from "../controllers/articles.js";
import {
  getCurrent,
  getUserById,
  getUserByUsername,
  userArticles,
} from "../controllers/users.js";

const router = express.Router();

router.get("/get-current", getCurrent);
router.get("/id/:userId", getUserById);
router.get("/clerk/id/:userId", getCurrent);
router.get("/username/:username", getUserByUsername);
router.get("/articles/:userId", userArticles);
router.get("/articles/recent_activities/:username", recentActivities);

export default router;
