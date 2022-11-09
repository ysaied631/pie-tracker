import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import { userFromRequest } from '@utils/auth';
import { User } from '@src/types';
import Layout from '@components/Layout';

interface HomePropsI {
  user?: User;
}

const Home: NextPage = ({ user }: HomePropsI) => {
  return (
    <Layout user={user}>
      <div></div>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  return {
    props: { user },
  };
};

export default Home;
