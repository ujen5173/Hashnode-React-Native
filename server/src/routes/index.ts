import { StrictAuthProp } from "@clerk/clerk-sdk-node";
import express from "express";
import { getAll } from "../controllers/articles.js";
import { getCurrent, newUser } from "../controllers/users.js";

const router = express.Router();

// this is for clerk authentication (see docs)
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

router.get("/articles", getAll);

router.get("/users/get-current", getCurrent);
router.get("/users/:userId", getCurrent);
router.post("/users/new", newUser);

export default router;
