import bodyParser from "body-parser";
import express from "express";
import { getNotifications } from "../controllers/notifications.js";

const router = express.Router();

router.post("/", bodyParser.json(), getNotifications);

export default router;
