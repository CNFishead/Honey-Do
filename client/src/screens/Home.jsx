import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";

// Components
import TodoList from "../components/TodoList";

import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      <Meta title={`Honey Do | Home`} />
      {userInfo ? (
        <Row>
          <Col>
            <TodoList />
          </Col>
        </Row>
      ) : (
        <Container fluid style={{ height: "100%" }} className="home-container">
          <Stack
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row style={{ textAlign: "center", width: "75%" }}>
              <Col>
                <p style={{ display: "inline", fontFamily: "serif" }}>
                  <span style={{ fontWeight: "bold" }}>The Honey-Do app</span>{" "}
                  was developed with one thing in mind, to be able to easily
                  track your to-do's and organize your life. You'll not find a
                  more user-friendly, easier way to keep track of your daily
                  workload. An exceptional app Built and maintained by
                  <a
                    href="https://wulfdevpage.azurewebsites.net/"
                    className="heading-link"
                  >
                    <p>Wulf Developments</p>
                  </a>
                  Never lose track of those things your spouse ask you{" "}
                  <span style={{ fontWeight: "bold" }}>To-Do</span> with the
                  Honey-Do App, Sign-Up today absolutely free!
                </p>
              </Col>
            </Row>
            <Row
              style={{ width: "100%", textAlign: "center", padding: "5% 0" }}
            >
              <Col>
                <Link to="/register">
                  <div className="heading-link" style={{ width: "auto" }}>
                    <h3>Sign-Up</h3>
                  </div>
                </Link>
                <Link to="/login">
                  <div className="heading-link" style={{ width: "auto" }}>
                    <h3>Sign-In</h3>
                  </div>
                </Link>
              </Col>
            </Row>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Home;
