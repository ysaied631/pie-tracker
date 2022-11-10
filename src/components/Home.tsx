import React, { useState, useEffect } from 'react';
import { User, Pie } from '@src/types';
import styles from '@components/Home.module.scss';
import InputForm from '@components/InputForm';
import PieHistory from '@components/PieHistory';

interface HomePropsI {
  user?: User;
}

const Home = ({ user }: HomePropsI) => {
  const [pies, setPies] = useState<Pie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetPies = async () => {
      const res = await fetch(`/api/pie/get?userId=${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPies(await res.json());
      setLoading(false);
    };

    if (loading) {
      GetPies();
    }
  }, []);

  return (
    <div className={styles.Container}>
      <InputForm user={user} pies={pies} setPies={(pi: Pie[]) => setPies(pi)} />
      <PieHistory pies={pies} />
    </div>
  );
};

export default Home;
