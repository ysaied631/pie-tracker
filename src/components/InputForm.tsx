import React, { useState } from 'react';
import { User, Pie } from '@src/types';
import Select, { SingleValue } from 'react-select';
import styles from '@components/InputForm.module.scss';
import { OptionType } from '@src/types';
import { options } from '@components/Const';

interface InputFormPropsI {
  user?: User;
  pies: Pie[];
  setPies: (pi: Pie[]) => void;
}

const InputForm = ({ user, pies, setPies }: InputFormPropsI) => {
  const [activity, setActivity] = useState<SingleValue<OptionType>>({
    label: '',
    value: '',
  });

  const AddActivity = async () => {
    const res = await fetch('/api/pie/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        activity: activity?.value,
      }),
    });
    const data = await res.json();
    const newPies = [...pies.filter((x) => x._id != data._id), data];
    setPies(newPies);
  };

  const RemoveActivity = async () => {
    const res = await fetch('/api/pie/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        activity: activity?.value,
      }),
    });
    const data = await res.json();
    const newPies = [...pies.filter((x) => x._id != data._id), data];
    setPies(newPies);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.ActivityDropdown}>
        <Select
          options={options}
          value={activity}
          onChange={(val: SingleValue<OptionType>) => setActivity(val)}
        />
      </div>
      <div className={styles.ButtonsContainer}>
        <button
          onClick={async () => {
            if (activity?.value) {
              await AddActivity();
            }
          }}
        >
          Add
        </button>
        <button
          onClick={async () => {
            if (activity?.value) {
              await RemoveActivity();
            }
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default InputForm;
