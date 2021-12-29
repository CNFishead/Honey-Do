import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
// Components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// Actions
import { register } from "../actions/userActions";
import Meta from "../components/Meta";
import GoogleAuth from "../components/GoogleAuth";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(null);
  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      password1: password,
      password2: confirmPassword,
    });
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !validLength &&
      !match &&
      !hasNumber &&
      !upperCase &&
      !lowerCase &&
      !specialChar
    ) {
      setMessage("Password Validation failed");
    } else {
      let user = { firstName, lastName, email, password, gender };
      dispatch(register(user));
    }
  };

  return (
    <>
      <Meta title={`Honey Do | Register`} />
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form
              onSubmit={submitHandler}
              className="form form-container"
              style={{ fontSize: "1.5em" }}
            >
              <Form.Group controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <FloatingLabel controlId="gender" label="Gender">
                <Form.Select
                  aria-label="select gender"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </FloatingLabel>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
                {password ? (
                  <Form.Text
                    style={{
                      fontFamily: "serif",
                      fontSize: ".9rem",
                    }}
                  >
                    Password must be{" "}
                    <span
                      className={validLength ? `valid` : `invalid`}
                      style={{ fontWeight: "bold" }}
                    >
                      6 characters long
                    </span>
                    , have atleast{" "}
                    <span
                      className={specialChar ? `valid` : `invalid`}
                      style={{ fontWeight: "bold" }}
                    >
                      1 special character
                    </span>
                    ,{" "}
                    <span
                      className={upperCase ? `valid` : `invalid`}
                      style={{ fontWeight: "bold" }}
                    >
                      Upper
                    </span>{" "}
                    and{" "}
                    <span
                      className={lowerCase ? `valid` : `invalid`}
                      style={{ fontWeight: "bold" }}
                    >
                      lower
                    </span>{" "}
                    case,{" "}
                    <span
                      className={hasNumber ? `valid` : `invalid`}
                      style={{ fontWeight: "bold" }}
                    >
                      include numbers
                    </span>
                  </Form.Text>
                ) : (
                  <div></div>
                )}
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
                {password !== "" ? (
                  match ? (
                    <Form.Text>
                      <span
                        className="valid"
                        style={{ fontFamily: "sans-serif", fontSize: ".8rem" }}
                      >
                        <i className="fas fa-check" /> Looks Good
                      </span>
                    </Form.Text>
                  ) : (
                    <Form.Text>
                      <span
                        className="invalid"
                        style={{ fontFamily: "sans-serif", fontSize: ".8rem" }}
                      >
                        <i className="fas fa-exclamation-circle" /> Passwords
                        must Match
                      </span>
                    </Form.Text>
                  )
                ) : (
                  <div></div>
                )}
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                style={{ width: "100%", fontSize: "1.25em" }}
              >
                Register
              </Button>

              <GoogleAuth message="Sign Up With Google" />
            </Form>

            <Row className="py-3" style={{ fontSize: "1.5em" }}>
              <Col>
                Have an Account? <Link to="/login">Login</Link>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
