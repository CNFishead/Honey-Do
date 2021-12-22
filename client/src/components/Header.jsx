import React, { useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
// components
import Loader from "./Loader";

// actions/constants
import { logout } from "../actions/userActions";
import { createTodo, listTodos } from "../actions/todoActions";
import { SET_CURRENT } from "../constants/todoConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // App state
  const { userInfo } = useSelector((state) => state.userLogin);
  const { todos, loading } = useSelector((state) => state.todoLists);
  const { todo } = useSelector((state) => state.todoCreate);
  const { current } = useSelector((state) => state.todoSet);

  useEffect(() => {
    // Check if a user is logged in
    if (!userInfo) {
      navigate("/login");
      // Get Users lists
    } else {
      dispatch(listTodos());
    }
  }, [userInfo, dispatch, navigate, todo, current]);

  // Handlers
  const createListHandler = () => {
    dispatch(createTodo({ name: "New Todo List" }));
  };
  const setCur = (list) => {
    dispatch({ type: SET_CURRENT, payload: list });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Navbar expand={false} collapseOnSelect className="header-container">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="heading-logo">
              <h1>Honey-Do</h1>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  {userInfo ? (
                    <NavDropdown
                      className="heading-link"
                      title={
                        <h3>{userInfo.firstName + " " + userInfo.lastName}</h3>
                      }
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
                    <NavDropdown
                      className="heading-link"
                      title={<h3>Admin</h3>}
                      id="adminmenu"
                    >
                      <LinkContainer
                        to="/admin/userlist"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Offcanvas.Header>
            <Offcanvas.Body
              className="header-container"
              style={{
                overflow: "hidden",
                scrolling: "true",
                textAlign: "left",
              }}
            >
              <>
                <div style={{ padding: "2%", textAlign: "center" }}>
                  <Button
                    variant="success"
                    style={{ fontFamily: "serif", width: "50%" }}
                    onClick={createListHandler}
                  >
                    Create new List
                  </Button>
                </div>
                {todos && !loading ? (
                  todos.map((todolist) => {
                    return (
                      <div
                        className="heading-link"
                        style={{
                          fontSize: "1.24rem",
                          fontFamily: "serif",
                          padding: "2%",
                        }}
                        key={todolist._id}
                        onClick={() => setCur(todolist)}
                      >
                        <h3>{todolist.name}</h3>
                      </div>
                    );
                  })
                ) : (
                  <Loader />
                )}
              </>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
