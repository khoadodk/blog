import React, { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavbarBrand>
            <strong>
              {APP_NAME}
              &nbsp;<i class="fab fa-blogger-b"></i>
            </strong>
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/register">
                <NavLink>Register</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signin">
                <NavLink>Sign In</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
