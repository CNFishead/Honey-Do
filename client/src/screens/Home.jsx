import React, { useEffect } from "react";
import { Container, Navbar, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTodos } from "../actions/todoActions";
// Components
import TodoList from "../components/TodoList";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // App state
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, success, todos } = useSelector((state) => state.honeyDoList);
  useEffect(() => {
    // Check if a user is logged in
    if (!userInfo) {
      navigate("/login");
      // Get Users lists
    } else {
      dispatch(listTodos());
    }
  }, [userInfo, dispatch, navigate, success]);
  return (
    <Container style={{ position: "relative" }}>
      <Row className="grid-2">
        <div>
          <TodoList />
        </div>
        <Navbar
          bg="light"
          expand={false}
          style={{
            position: "absolute",
            width: "auto",
            top: "0",
            right: "0",
            backgroundColor: "transparent !important",
          }}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  To do Lists
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{ overflow: "hidden", scrolling: "true" }}>
                {todos ? (
                  todos.map((todolist) => {
                    return (
                      <div
                        className="heading-link"
                        style={{
                          fontSize: "1.24rem",
                          fontFamily: "serif",
                          padding: "2%",
                        }}
                      >
                        <h3>{todolist.name}</h3>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Home;
