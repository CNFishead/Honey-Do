import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" collapseOnSelect className="header-container">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="heading-logo">
            <h1>Honey-Do</h1>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            style={{ width: "100%", justifyContent: "end" }}
          >
            {userInfo ? (
              <NavDropdown
                className="heading-link"
                title={<h3>{userInfo.firstName + " " + userInfo.lastName}</h3>}
                id="username"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login" className="heading-link">
                  <Nav.Link>
                    <h3>
                      <i className="fas fa-user"></i> Sign-In
                    </h3>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" className="heading-link">
                  <Nav.Link>
                    <h3>
                      <i className="fas fa-user"></i> Register
                    </h3>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
