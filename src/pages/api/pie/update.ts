// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import PieModel from '@src/db/PieModel';
import dbConnect from '@utils/dbConnect';
import { ActivityPayload } from '@src/types';

type reqQuery = {
  PieId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { PieId } = req.query as reqQuery;
  const payload = req.body as ActivityPayload[];
  //await runCorsMiddleware(req, res);
  if (method != 'POST') res.status(400).send('Bad request method');

  await dbConnect();

  const pie = await PieModel.findById(PieId);

  const updated = {
    activities: payload.map((item) => {
      return {
        activity: item.id,
        units: item.units,
      };
    }),
  };

  await pie?.updateOne(updated);

  res.status(200).send('Success');
};

export default handler;
