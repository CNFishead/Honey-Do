import React, { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";

// Components
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

import { useDispatch } from "react-redux";
import { forgotPassword } from "../actions/Auth/forgotPassword";

const Reset = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  return (
    <Container>
      <Meta title={`Honey Do | Password Reset`} />
      <FormContainer>
        <h1>Reset Account Password</h1>
        <Form onSubmit={submitHandler}>
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
            <Form.Text style={{ fontFamily: "sans-serif" }}>
              Please Enter the Email Associated with the account, if the account
              exists in our system you will receive an email with a link to
              reset your password.
            </Form.Text>
          </Form.Group>
          {loading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="dark"
              style={{ width: "100%", marginTop: "2%" }}
            >
              Send reset link
            </Button>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Reset;
