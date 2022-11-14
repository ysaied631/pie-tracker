// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import PieModel from '@src/db/PieModel';
import dbConnect from '@src/utils/dbConnect';

type reqBody = {
  userId: string;
  activity: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userId, activity } = req.body as reqBody;
  //await runCorsMiddleware(req, res);
  if (method != 'POST') res.status(400).send('Bad request method');

  await dbConnect();

  const dateWithoutTime = new Date();
  dateWithoutTime.setHours(0, 0, 0, 0);

  const todaysPie = await PieModel.findOne({
    userId: userId,
    createdAt: dateWithoutTime,
  });

  if (todaysPie) {
    const activityExists = todaysPie.activities.find(
      (x) => x.activity == activity,
    );

    if (activityExists) {
      const updatePie = {
        activities:
          activityExists?.units > 1
            ? [
              ...todaysPie.activities.filter((x) => x.activity != activity),
              {
                activity: activity,
                units: activityExists.units - 1,
              },
            ]
            : [
              ...todaysPie.activities.filter((x) => x.activity != activity),
              {
                activity: activity,
                units: 0,
              },
            ],
      };
      await todaysPie.updateOne(updatePie);
    }
  }

  const pie = await PieModel.findOne({
    userId: userId,
    createdAt: dateWithoutTime,
  });

  res.status(200).json(pie);
};

export default handler;
