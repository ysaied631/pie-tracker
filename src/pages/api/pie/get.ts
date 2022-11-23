// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import PieModel from '@src/db/PieModel';
import dbConnect from '@utils/dbConnect';
import { Types } from 'mongoose';
import { Pie } from '@src/types';

type reqBody = {
  userId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userId } = req.query as reqBody;
  //await runCorsMiddleware(req, res);
  if (method != 'GET') res.status(400).send('Bad request method');

  await dbConnect();
  const data = await PieModel.find({
    userId: new Types.ObjectId(userId.toString()),
  });

  const dateWithoutTime = new Date();
  dateWithoutTime.setHours(0, 0, 0, 0);

  data.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
  const weekPies: Pie[] = data.slice(
    0,
    data.map((x) => x.createdAt).includes(dateWithoutTime) ? 7 : 6,
  );

  res.status(200).json(weekPies);
};

export default handler;
