import bodyParser from "body-parser";
import express from "express";
import { recentActivities } from "../controllers/articles.js";
import {
  getCurrent,
  getUserById,
  getUserByUsername,
  profile,
  updateProfile,
  userArticles,
} from "../controllers/users.js";

const router = express.Router();

router.get("/get-current", getCurrent);
router.get("/id/:userId", getUserById);
router.get("/profile", profile);
router.get("/clerk/id/:userId", getCurrent);
router.get("/username/:username", getUserByUsername);
router.get("/articles/:userId", userArticles);
router.get("/articles/recent_activities/:username", recentActivities);

router.put("/update", bodyParser.json(), updateProfile);

export default router;
