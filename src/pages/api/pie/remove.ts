// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "@utils/middleware";
import PieModel from "@src/db/PieModel";

type reqBody = {
  userId: string;
  activity: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userId, activity } = req.body as reqBody;
  //await runCorsMiddleware(req, res);
  if (method != "POST") res.status(400).send("Bad request method");

  const todaysPie = await PieModel.findOne({
    userId: userId,
    createdAt: new Date().toLocaleDateString(),
  });

  if (todaysPie) {
    const activityExists = todaysPie.activities.find((x) => x.name == activity);

    if (activityExists) {
      const updatePie = {
        activities:
          activityExists?.hours > 1
            ? [
                ...todaysPie.activities.filter((x) => x.name != activity),
                {
                  name: activity,
                  hours: activityExists.hours - 1,
                },
              ]
            : [
                ...todaysPie.activities.filter((x) => x.name != activity),
                {
                  name: activity,
                  hours: 0,
                },
              ],
      };
      await todaysPie.updateOne(updatePie);
    }
  }

  res.status(200).send("Remove");
};

export default handler;
