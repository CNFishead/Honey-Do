import React, { useEffect } from "react";
import { Button, Container, Navbar, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo, listTodos, setCurrent } from "../actions/todoActions";
// Components
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";
import { SET_CURRENT } from "../constants/todoConstants";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // App state
  const { userInfo } = useSelector((state) => state.userLogin);
  const { todos, loading } = useSelector((state) => state.todoLists);
  const {
    todo,
    loading: loadingCreate,
    success: successCreate,
  } = useSelector((state) => state.todoCreate);
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
  return (
    <Container>
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
            top: "15%",
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
      </Row>
    </Container>
  );
};

export default Home;
