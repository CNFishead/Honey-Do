import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <FormContainer>
        <h1>Login</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="form form-container">
          <Form.Group controlId="email">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="password">
            <FloatingLabel
              controlId="floatinInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="styled-button"
            style={{ width: "100%", fontSize: "1.25em" }}
          >
            Sign-In
          </Button>
        </Form>
        <Container style={{ paddingTop: "5%" }}>
          <Link
            style={{ textDecoration: "none" }}
            className="gradient-text"
            to="/resetpassword"
          >
            <span>Forgot Password</span>
          </Link>
        </Container>
        <Container style={{ paddingTop: "1.5%" }}>
          <span style={{ fontSize: "1.5em" }}>Not a user yet? </span>
          <Link
            style={{ textDecoration: "none" }}
            className="gradient-text"
            to="/resetpassword"
          >
            <span style={{ fontSize: "2.5em", fontWeight: "bold" }}>
              Register!
            </span>
          </Link>
        </Container>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
