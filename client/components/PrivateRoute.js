import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../helpers/localStogage';

const PrivateRoute = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    }
  }, []);
  return <>{children}</>;
};

export default PrivateRoute;
