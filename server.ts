import { config } from "dotenv";
import express, { Request, Response } from "express";
import next from "next";
import mongoose from "mongoose";
import PieModel from "./src/db/PieModel";
import { Types } from "mongoose";

config();

(async () => {
  const port = parseInt(process.env.PORT || "8080", 10);
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  try {
    await mongoose.connect(
      process.env.MONGO_URL || "" /*, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }*/
    );
    console.log("Connected to DB !!");

    await app.prepare();
    const server = express();

    server.get("/sse", async (req: Request, res: Response) => {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      const { userId } = req.query;

      const interval: ReturnType<typeof setTimeout> = setInterval(async () => {
        if (userId) {
          const data = await PieModel.find({
            userId: new Types.ObjectId(userId.toString()),
          });
          data.sort(
            (a, b) =>
              b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds()
          );
          data.slice(0, 6);
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        } else {
          res.write("No user");
        }
      }, 3000);

      res.on("close", () => {
        console.log("client dropped me");
        if (interval) clearInterval(interval);
        res.end();
      });
    });

    server.all("/healthcheck", (req: Request, res: Response) =>
      res.status(200).send("Healthy")
    );

    server.all("*", (req: Request, res: Response) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
})().catch((error) => {
  console.log("server error", error);
});
