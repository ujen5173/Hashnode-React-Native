import { StrictAuthProp } from "@clerk/clerk-sdk-node";
import bodyParser from "body-parser";
import express from "express";
import {
  getAll,
  multiple,
  seedArticles,
  single,
} from "../controllers/articles.js";
import { searchTags } from "../controllers/tags.js";
import { getCurrent, getUserByUsername } from "../controllers/users.js";

const router = express.Router();

// this is for clerk authentication (see docs)
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

router.get("/articles", getAll);
router.post("/articles/multiple", bodyParser.json(), multiple);
router.post("/articles/seed", seedArticles);
router.get("/articles/:slug", single);

router.get("/users/get-current", getCurrent);
router.get("/users/id/:userId", getCurrent);
router.get("/users/username/:username", getUserByUsername);

router.get("/tags", searchTags);

export default router;
