import type { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

export const cookieOptions = {
  //httpOnly: true,
  maxAge: 2592000,
  path: '/',
  //sameSite: "Strict",
  secure: process.env.NODE_ENV === 'production',
};

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = async (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}