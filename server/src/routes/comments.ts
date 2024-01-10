import bodyParser from "body-parser";
import express from "express";
import {
  getComments,
  likeComment,
  newComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/:slug", getComments);
router.post("/:slug", bodyParser.json(), newComment);
router.put("/:commentId/like", bodyParser.json(), likeComment);

export default router;
