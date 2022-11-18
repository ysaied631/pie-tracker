import React, { useState } from 'react';
import styles from '@components/PieModal.module.scss';
import { options } from '@components/Const';
import { Activity, ActivityPayload, OptionType, Pie } from '@src/types';

interface PieModalPropsI {
  selectedPie: Pie;
  closeModal: () => void;
}

const PieModal: React.FunctionComponent<PieModalPropsI> = ({
  selectedPie,
  closeModal,
}: PieModalPropsI) => {
  const [payload, setPayload] = useState(
    options.map((option: OptionType) => {
      return {
        id: option.value,
        units:
          selectedPie.activities.find(
            (activity: Activity) => activity.activity == option.value,
          )?.units || 0,
      };
    }),
  );

  const submitUpdate = async () => {
    await fetch(`/api/pie/update?PieId=${selectedPie._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    closeModal();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.closeContainer}>
          <div className={styles.close} onClick={closeModal}>
            x
          </div>
        </div>
        <div className={styles.optionsContainer}>
          {options.map((option: OptionType) => (
            <div key={option.value} className={styles.optionRow}>
              <div className={styles.groupColourText}>
                <div
                  className={styles.legendColour}
                  style={{ backgroundColor: option.colour }}
                ></div>
                <div>{option.label}</div>
              </div>
              <input
                id={option.value}
                type="number"
                className={styles.numericInput}
                min={0}
                max={
                  24 -
                  payload
                    .filter(
                      (activity: ActivityPayload) =>
                        activity.id != option.value,
                    )
                    .map((activity: ActivityPayload) => activity.units)
                    .reduce((pSum: number, a: number) => pSum + a, 0)
                }
                value={
                  payload.find(
                    (activity: ActivityPayload) => activity.id == option.value,
                  )?.units || 0
                }
                onChange={(event) => {
                  const currentActivity: ActivityPayload | undefined =
                    payload.find(
                      (activity: ActivityPayload) =>
                        activity.id == option.value,
                    );
                  if (currentActivity) {
                    currentActivity.units = parseInt(event.target.value);
                    setPayload((state) => [
                      ...state.filter(
                        (activity: ActivityPayload) =>
                          activity.id != option.value,
                      ),
                      currentActivity,
                    ]);
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={submitUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default PieModal;
