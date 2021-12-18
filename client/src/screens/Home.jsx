import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// Components
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodoList />
        </Col>
        <Col>
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
