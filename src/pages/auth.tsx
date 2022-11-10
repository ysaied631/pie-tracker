import React from "react";
import type { NextPage, GetServerSidePropsContext } from "next";
import Auth from "../components/Auth";
import { userFromRequest } from "@utils/auth";
import { User } from "@src/types";

const AuthPage: NextPage = () => {
  return (
    <>
      <Auth />
    </>
  );
};

export default AuthPage;
