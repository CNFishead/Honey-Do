import axios from "axios";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const Support = () => {
  const [support, setSupport] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({
    variant: "danger",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSupport({ ...support, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      setLoading(!loading);
      const data = await axios({
        method: "POST",
        url: `/api/support`,
        data: support,
      });
      if (data.data.success) {
        setLoading(false);
      }
      setError(!error);
      setMessage({
        variant: "success",
        text: "Message was received successfully, you should hear from us soon",
      });
    } catch (e) {
      console.log(e);
      setError(!error);
      setMessage({
        variant: "danger",
        message: `Something went wrong \n ${e.message}`,
      });
    }
  };
  return (
    <div>
      <Meta title={`Honey Do | Support`} />
      <FormContainer>
        {error && <Message variant={message.variant}>{message.text}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>Support</h1>
            <Form
              style={{
                fontFamily: "sans-serif",
                backgroundColor: "#dbc069",
                padding: "10%",
                borderRadius: "5%",
              }}
              onSubmit={submitHandler}
            >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={support.name}
                    placeholder="Please enter your full name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={support.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phone">
                  <Form.Label>Phone - (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    value={support.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Please specify the problem"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Problem"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Button
                variant="success"
                type="submit"
                style={{ width: "75%", margin: "5%" }}
              >
                Submit
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default Support;
