import React from 'react';
import { Routes } from '@utils/constants';
import { Route, User } from '@src/types';
import { useRouter } from 'next/router';
import { logout } from '@utils/auth';
import classNames from 'classnames';
import styles from '@components/Header.module.scss';

interface HeaderPropsI {
  user?: User;
}

const Header = ({ user }: HeaderPropsI) => {
  const router = useRouter();
  return (
    <div className={styles.headerContainer}>
      <span className={styles.headerLogo} onClick={() => router.push('/')}>
        Logo
      </span>
      <div className={styles.headerRoutes}>
        {Routes.map((x: Route) => {
          return (
            <a
              key={x.id}
              href={x.route}
              className={classNames({
                [styles.headerSelectedRoute]: x.route == router.pathname,
              })}
            >
              {x.name}
            </a>
          );
        })}
      </div>
      {!user ? (
        <button
          className={styles.authButton}
          onClick={() => router.push('/auth')}
        >
          Login
        </button>
      ) : (
        <button
          className={styles.authButton}
          onClick={async () => {
            await logout();
            router.reload();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
