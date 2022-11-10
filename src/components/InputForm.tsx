import React, { useState } from 'react';
import { User } from '@src/types';
import Select, { SingleValue } from 'react-select';
import styles from '@components/InputForm.module.scss';

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  {
    label: 'Calls',
    value: 'Calls',
  },
  {
    label: 'Coding',
    value: 'Coding',
  },
  {
    label: 'PRs',
    value: 'PRs',
  },
  {
    label: 'Ticketing',
    value: 'Ticketing',
  },
  {
    label: 'Unit testing',
    value: 'Unit testing',
  },
];

interface InputFormPropsI {
  user?: User;
}

const InputForm = ({ user }: InputFormPropsI) => {
  const [activity, setActivity] = useState<SingleValue<OptionType>>({
    label: '',
    value: '',
  });

  const AddActivity = async () => {
    await fetch('/api/pie/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        activity: activity?.value,
      }),
    });
  };

  const RemoveActivity = async () => {
    await fetch('/api/pie/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        activity: activity?.value,
      }),
    });
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
