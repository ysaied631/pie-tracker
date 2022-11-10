import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { CreateUserInput, User, UserInput } from '@src/types';
import UserModel from '@db/UserModel';
import dbConnect from '@utils/dbConnect';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';

export async function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
): Promise<User | undefined> {
  const { auth: token } = req.cookies;

  if (!token) return undefined;

  try {
    const data = jwt.verify(token, JWT_TOKEN_KEY);

    if (!data) return undefined;
    //await dbConnect();
    const user = await UserModel.findOne({ email: (data as any).email });

    return {
      id: user?._id.toString(),
      email: user?.email,
      username: user?.username,
    } as User;
  } catch (error) {
    return undefined;
  }
}

export const signup = async (model: CreateUserInput) => {
  return await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  });
};

export const login = async (user: UserInput) => {
  return await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const logout = async () => {
  const data = await fetch('/api/auth/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // window.location.pathname = '/login'
};
