import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import { Webhook } from "svix";
import connectDB from "./db/index.js";
import articleRouter from "./routes/articles.router.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use("/api/v1/articles", articleRouter);

// Real code
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
      const evt: any = wh.verify(payloadString, {
        ...svixHeaders,
        "webhook-id": "", // Add the missing headers here
        "webhook-timestamp": "",
        "webhook-signature": "",
      });

      const { id, ...attributes } = evt.data;

      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === "user.created") {
        console.log(`User ${id} was ${eventType}`);
        console.log(attributes);
      }
      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Webhook not received",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`🚀 [server]: Server is running at http://localhost:${port}`);
});
