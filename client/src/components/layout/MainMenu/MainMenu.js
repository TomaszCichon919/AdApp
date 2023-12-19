import { useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { useSelector } from 'react-redux';

const MainMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  const isLoggedIn = useSelector(state => state.user !== null);
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Ad App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">
                    <Button outline color="primary">Log in!</Button>
                  </NavLink>
                </NavItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink href="/logout">Sign out</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/ad/add">Add new ad</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}

export default MainMenu;
