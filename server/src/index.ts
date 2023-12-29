// @ts-nocheck
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import handleWebhook from "./controllers/webhook.js";
import connectDB from "./db/index.js";
import router from "./routes/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use("/api/v1", router);

// Real code
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

app.listen(port, () => {
  console.log(`🚀 [server]: Server is running at http://localhost:${port}`);
});
