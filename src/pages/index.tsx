import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import { userFromRequest } from '@utils/auth';
import { User } from '@src/types';
import Layout from '@components/Layout';
import Home from '@components/Home';

interface HomePagePropsI {
  user?: User;
}

const HomePage: NextPage = ({ user }: HomePagePropsI) => {
  return (
    <Layout user={user}>
      <Home user={user} />
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  return {
    props: { user },
  };
};

export default HomePage;
