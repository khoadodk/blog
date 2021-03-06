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
    <>
      <div className="bg-dark">
        <Navbar expand="md">
          <NavbarBrand href="/">
            {APP_NAME}
            &nbsp;<i className="fab fa-blogger-b"></i>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="navbar-dark" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <React.Fragment>
                <NavItem>
                  <Link href="/blogs">
                    <NavLink
                      className={router.pathname == '/blogs' ? 'active' : ''}
                    >
                      Blogs
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>

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
                        className={
                          router.pathname == '/register' ? 'active' : ''
                        }
                      >
                        Register
                      </NavLink>
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}

              <NavItem>
                <Link href="/contact">
                  <NavLink
                    className={router.pathname == '/contact' ? 'active' : ''}
                  >
                    Contact Us
                  </NavLink>
                </Link>
              </NavItem>

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

              <NavItem>
                <NavLink>
                  <a
                    className="btn btn-outline-info pr-1 pl-1 pt-0 pb-0"
                    href="/user/crud/blog"
                  >
                    Write a Blog
                  </a>
                </NavLink>
              </NavItem>

              {isAuth() && (
                <NavItem>
                  <NavLink
                    onClick={() => signout(() => Router.replace(`/signin`))}
                  >
                    <i className="fa fa-sign-out-alt"></i>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
