import bodyParser from "body-parser";
import express from "express";
import {
  getAll,
  getArticlesByTag,
  like,
  multiple,
  seedArticles,
  single,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/", getAll);
router.get("/tag/:slug", getArticlesByTag);
router.post("/multiple", bodyParser.json(), multiple);
router.post("/seed", bodyParser.json(), seedArticles);
router.get("/:slug", single);
router.put("/like/:slug", bodyParser.json(), like);

export default router;
