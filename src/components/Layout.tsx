import React, { useEffect } from 'react';
import { User } from '@src/types';
import Header from '@components/Header';
import useRouter from 'next/router';
import styles from '@components/Layout.module.scss';

interface LayoutPropsI {
  user?: User;
  children: React.ReactNode;
}

function recursiveMap(children: any, fn: any) {
  // better typing needs to be done
  return React.Children.map(
    children,
    (child: { type: any; props: { children: any } }) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn),
        });
      }

      if (typeof child.type === 'string') {
        return child;
      }

      return fn(child);
    },
  );
}

const Layout = ({ user, children }: LayoutPropsI) => {
  const router = useRouter;

  useEffect(() => {
    if (user) {
      children = recursiveMap(children, (child: any) =>
        React.cloneElement(child, { user }),
      );
    } else {
      router.push('/auth');
    }
  }, [user]);

  return (
    <div className={styles.background}>
      <Header user={user} />
      {children}
    </div>
  );
};

export default Layout;
