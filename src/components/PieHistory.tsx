import React, { useState, useEffect } from 'react';
import styles from '@components/PieHistory.module.scss';
import { Pie, Activity, OptionType, User } from '@src/types';
import _ from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';
import { options } from '@components/Const';
import PieModal from '@components/PieModal';

interface PieHistoryPropsI {
  user?: User;
}

const PieHistory: React.FunctionComponent<PieHistoryPropsI> = ({
  user,
}: PieHistoryPropsI) => {
  const [selectedPie, setSelectedPie] = useState<Pie | null>(null);
  const [pies, setPies] = useState<Pie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const CreateToday = async () => {
    const res = await fetch(`/api/pie/add?userId=${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      await GetPies();
    }
  };

  useEffect(() => {
    if (loading) {
      GetPies();
    }
  }, []);

  const dateWithoutTime = new Date();
  dateWithoutTime.setHours(0, 0, 0, 0);

  return (
    <div className={styles.Container}>
      <div className={styles.PieContainer}>
        {pies?.length > 0 &&
          pies
            ?.sort(
              (a: Pie, b: Pie) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf(),
            )
            .map((pie: Pie, index: number) => (
              <div
                className={styles.Pie}
                key={index}
                onClick={() => setSelectedPie(pie)}
              >
                <PieChart
                  data={pie.activities
                    .filter((activity: Activity) => activity.units > 0)
                    .map((activity: Activity) => {
                      const option: OptionType =
                        options.find(
                          (x: OptionType) => x.value == activity.activity,
                        ) || options[0];
                      return {
                        title: option?.label,
                        value: activity.units,
                        color: option?.colour || '#ffffff',
                      };
                    })}
                  className={styles.Chart}
                  label={({ dataEntry }) =>
                    `${dataEntry.title} - ${Math.round(
                      (dataEntry.value /
                        pie.activities
                          .map((x: Activity) => x.units)
                          .reduce((psum: number, a: number) => psum + a, 0)) *
                        100,
                    )}%`
                  }
                  labelStyle={{ fontSize: '5px', fill: 'white' }}
                />
                <span className={styles.PieLabel}>
                  {new Date(pie.createdAt).toDateString()}
                </span>
              </div>
            ))}
        {!pies.find(
          (pie: Pie) =>
            new Date(pie.createdAt).valueOf() == dateWithoutTime.valueOf(),
        ) && (
          <div className={styles.CreateContainer}>
            <div></div>
            <button className={styles.CreateButton} onClick={CreateToday}>
              Create today's pie
            </button>
            <span className={styles.PieLabel}>{new Date().toDateString()}</span>
          </div>
        )}
      </div>
      {selectedPie && (
        <PieModal
          selectedPie={selectedPie}
          closeModal={async () => {
            await GetPies();
            setSelectedPie(null);
          }}
        />
      )}
    </div>
  );
};

export default PieHistory;
