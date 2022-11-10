// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import jwt from 'jsonwebtoken';
import { setCookie, cookieOptions } from '@utils/cookies';
import UserModel from '@db/UserModel';
import * as argon2 from 'argon2';
import dbConnect from '@utils/dbConnect';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  //await runCorsMiddleware(req, res);

  if (method != 'POST') res.status(400).send('Bad request method');

  await dbConnect();

  const newUser = {
    ...body,
    passwordHash: await argon2.hash(body.password),
    createdAt: Date.now(),
  };
  delete newUser.password;

  const user = await UserModel.create(newUser);

  const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
    expiresIn: '1d',
  });

  setCookie(res, 'auth', token, cookieOptions);

  user.passwordHash = '';

  res.status(200).send(user);
};

export default handler;
