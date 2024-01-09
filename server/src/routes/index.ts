import express from "express";
import articles from "./articles.js";
import notifications from "./notification.js";
import tags from "./tags.js";
import users from "./users.js";

const router = express.Router();

router.use("/users", users);
router.use("/articles", articles);
router.use("/tags", tags);
router.use("/notifications", notifications);

export default router;
