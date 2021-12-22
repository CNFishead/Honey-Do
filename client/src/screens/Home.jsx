import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

// actions/constants
import { createTodo, listTodos } from "../actions/todoActions";
import { SET_CURRENT } from "../constants/todoConstants";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    // Check if a user is logged in
    if (!userInfo) {
      navigate("/login");
      // Get Users lists
    }
  }, [dispatch, navigate]);

  return (
    <Container>
      <Meta title={`Honey Do | Home`} />
      <Row className="grid-2">
        <Col>
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
