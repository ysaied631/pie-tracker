import React, { useState } from 'react';
import { login, signup } from '@utils/auth';
import { CreateUserInput, UserInput } from '@src/types';
import useRouter from 'next/router';
import classNames from 'classnames';
import styles from '@components/Auth.module.scss';

const Auth: React.FunctionComponent = () => {
  const router = useRouter;

  const [screen, setScreen] = useState<string>('login');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitLogin = async () => {
    const model: UserInput = { username, password };
    const res = await login(model);
    if (res.ok) router.push('/');
  };

  const submitSignup = async () => {
    const model: CreateUserInput = { email, username, password };
    const res = await signup(model);
    if (res.ok) router.push('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <span
            className={classNames({
              [styles.authHeader__text]: true,
              [styles.authHeader__selected]: screen == 'login',
            })}
            onClick={() => setScreen('login')}
          >
            Login
          </span>
          <span
            className={classNames({
              [styles.authHeader__text]: true,
              [styles.authHeader__selected]: screen == 'signup',
            })}
            onClick={() => setScreen('signup')}
          >
            Signup
          </span>
        </div>
        {screen == 'login' && (
          <div className={styles.authFieldContainer}>
            <div className={styles.authField}>
              <span className={styles.authField__text}>Username</span>
              <input
                className={styles.authField__input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.authField}>
              <span className={styles.authField__text}>Password</span>
              <input
                className={styles.authField__input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key == 'Enter') await submitLogin;
                }}
              />
            </div>
            <button onClick={submitLogin}>Login</button>
          </div>
        )}
        {screen == 'signup' && (
          <div className={styles.authFieldContainer}>
            <div className={styles.authField}>
              <span className={styles.authField__text}>Email</span>
              <input
                className={styles.authField__input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.authField}>
              <span className={styles.authField__text}>Username</span>
              <input
                className={styles.authField__input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.authField}>
              <span className={styles.authField__text}>Password</span>
              <input
                className={styles.authField__input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={submitSignup}>Signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
