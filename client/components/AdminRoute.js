import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../helpers/localStogage';

const AdminRoute = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    } else if (isAuth().role !== 1) {
      Router.push(`/`);
    }
  }, []);
  return <>{children}</>;
};

export default AdminRoute;
