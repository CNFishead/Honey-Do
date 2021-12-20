import React from "react";
import {
  Container,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
// Components
import TodoList from "../components/TodoList";

const Home = () => {
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
              <Offcanvas.Body>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Home;
