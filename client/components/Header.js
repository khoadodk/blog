import React, { useState } from 'react';
import { APP_NAME } from '../config';
import Router from 'next/router';
import Link from 'next/link';
import NProgress from 'nprogress';
import { isAuth } from '../helpers/localStogage';
import { signout } from '../helpers/authFetch';
import { useRouter } from 'next/router';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

//show progress bar when switching route
if (typeof window !== 'undefined') {
  NProgress.configure({ showSpinner: false });
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const router = useRouter();

  return (
    <div className="bg-dark">
      <Navbar expand="md">
        <NavbarBrand href="/">
          {APP_NAME}
          &nbsp;<i className="fab fa-blogger-b"></i>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="navbar-dark" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink
                      className={router.pathname == '/signin' ? 'active' : ''}
                    >
                      Sign In
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/register">
                    <NavLink
                      className={router.pathname == '/register' ? 'active' : ''}
                    >
                      Register
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink
                    className={router.pathname == '/user' ? 'active' : ''}
                  >
                    {isAuth().name}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink
                    className={router.pathname == '/admin' ? 'active' : ''}
                  >
                    {isAuth().name}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
