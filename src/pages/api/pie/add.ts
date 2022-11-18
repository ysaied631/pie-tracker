// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import PieModel from '@src/db/PieModel';
import dbConnect from '@utils/dbConnect';

type reqQuery = {
  userId: string;
  activity: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userId } = req.query as reqQuery;
  //await runCorsMiddleware(req, res);
  if (method != 'GET') res.status(400).send('Bad request method');

  await dbConnect();

  const dateWithoutTime = new Date();
  dateWithoutTime.setHours(0, 0, 0, 0);

  const pie = await PieModel.findOne({
    userId: userId,
    createdAt: dateWithoutTime,
  });

  if (!pie) {
    await PieModel.create({
      userId: userId,
      createdAt: dateWithoutTime,
    });
  }

  res.status(200).send('Success');
};

export default handler;
