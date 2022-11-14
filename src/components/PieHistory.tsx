import React from 'react';
import styles from '@components/PieHistory.module.scss';
import { Pie, Activity } from '@src/types';
import _ from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';
import { options } from '@components/Const';

interface PieHistoryPropsI {
  pies: Pie[];
}

const PieHistory = ({ pies }: PieHistoryPropsI) => {
  return (
    <div className={styles.Container}>
      <span className={styles.Title}>Last 7 charts</span>
      <div className={styles.PieContainer}>
        {pies?.length > 0 &&
          pies
            ?.sort(
              (a: Pie, b: Pie) =>
                new Date(b.createdAt).getMilliseconds() -
                new Date(a.createdAt).getMilliseconds(),
            )
            .map((pie: Pie, index: number) => (
              <div className={styles.Pie} key={index}>
                <PieChart
                  data={pie.activities
                    .filter((activity: Activity) => activity.units > 0)
                    .map((activity: Activity) => {
                      return {
                        title: options.find((x) => x.value == activity.activity)
                          ?.label,
                        value: activity.units,
                        color:
                          '#' +
                          ((Math.random() * 0xffffff) << 0)
                            .toString(16)
                            .padStart(6, '0'),
                      };
                    })}
                  className={styles.Chart}
                  label={({ dataEntry }) =>
                    `${dataEntry.title} - ${Math.round(
                      (dataEntry.value /
                        pie.activities
                          .map((x) => x.units)
                          .reduce((psum, a) => psum + a, 0)) *
                        100,
                    )}%`
                  }
                  labelStyle={{ fontSize: '5px' }}
                />
                <span>{new Date(pie.createdAt).toDateString()}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PieHistory;
