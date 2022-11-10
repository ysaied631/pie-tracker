import { User } from "@src/types";
import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import styles from "@components/PieHistory.module.scss";
import _ from "lodash";

// interface PieHistoryPropsI {
//   user?: User;
// }

// type Activity = {
//   name: string;
//   hours: number;
// };

// type Pie = {
//   createdAt: Date;
//   activities: Activity[];
// };

const PieHistory = ({ user }) => {
  const [pies, setPies] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const sse = new EventSource(`/sse?userId=${user?.id}`);

      sse.onmessage = (e) => {
        const newData = JSON.parse(e.data);
        setPies((pies) => (_.isEqual(pies, newData) ? pies : newData));
      };
      sse.onerror = (err) => {
        console.log(err);
        sse.close();
      };
      setListening(true);
    }
  }, []);

  return (
    <div className={styles.Container}>
      <span className={styles.Title}>Last 7 charts</span>
      <div className={styles.PieContainer}>
        {listening &&
          pies.length > 0 &&
          pies
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getMilliseconds() -
                new Date(a.createdAt).getMilliseconds()
            )
            .map((pie) => (
              <div className={styles.Pie}>
                <PieChart
                  data={pie.activities.map((activity) => {
                    return {
                      title: activity.name,
                      value: activity.hours,
                      color:
                        "#" +
                        ((Math.random() * 0xffffff) << 0)
                          .toString(16)
                          .padStart(6, "0"),
                    };
                  })}
                  className={styles.Chart}
                  label={({ dataEntry }) =>
                    `${dataEntry.title} - ${Math.round(
                      (dataEntry.value /
                        pie.activities
                          .map((x) => x.hours)
                          .reduce((psum, a) => psum + a, 0)) *
                        100
                    )}%`
                  }
                  labelStyle={{ fontSize: "5px" }}
                />
                <span>{new Date(pie.createdAt).toDateString()}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PieHistory;
