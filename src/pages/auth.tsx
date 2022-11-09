import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Auth from '../components/Auth';
import { userFromRequest } from '@utils/auth';
import { User } from '@src/types';

interface AuthPropsI {
  user?: User;
}

const AuthPage: NextPage = ({ user }: AuthPropsI) => {
  return (
    <>
      <Auth />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  return {
    props: user,
  };
};

export default AuthPage;
