import React from "react";
import { User } from "@src/types";
import styles from "@components/Home.module.scss";
import InputForm from "@components/InputForm";
import PieHistory from "@components/PieHistory";

interface HomePropsI {
  user: User;
}

const Home = ({ user }: HomePropsI) => {
  return (
    <div className={styles.Container}>
      <InputForm user={user} />
      <PieHistory user={user} />
    </div>
  );
};

export default Home;
