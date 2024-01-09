import express from "express";
import { searchTags, singleTag } from "../controllers/tags.js";
const router = express.Router();

router.get("/", searchTags);
router.get("/:slug", singleTag);

export default router;
