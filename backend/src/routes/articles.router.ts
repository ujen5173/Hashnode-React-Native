import express from "express";
import * as articlesControllers from "../controllers/articles.js";

const articleRouter = express.Router();

articleRouter.get("/", articlesControllers.default.getAll);

export default articleRouter;
