// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import { setCookie, cookieOptions } from '@utils/cookies';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req;
  await runCorsMiddleware(req, res);
  if (method != 'DELETE') res.status(400).send('Bad request method');

  setCookie(res, 'auth', '0', {
    ...cookieOptions,
    path: '/',
    maxAge: 1,
  });

  res.status(200).send('logged out');
};

export default handler;