// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runCorsMiddleware } from '@utils/middleware';
import jwt from 'jsonwebtoken';
import { setCookie, cookieOptions } from '@utils/cookies';
import UserModel from '@db/UserModel';
import * as argon2 from 'argon2';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  console.log('start');

  //await runCorsMiddleware(req, res);

  if (method != 'POST') res.status(400).send('Bad request method');

  res.status(200).send(body);
  const user = await UserModel.findOne({ username: body.username });
  console.log('found user');

  if (user) {
    const authed = await argon2.verify(user.passwordHash, body.password);

    if (authed) {
      const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
        expiresIn: '1d',
      });

      setCookie(res, 'auth', token, cookieOptions);

      user.passwordHash = '';

      res.status(200).send(user);
    } else {
      res.status(401).send('Incorrect login');
    }
  } else {
    res.status(401).send('Incorrect login');
  }
};

export default handler;
