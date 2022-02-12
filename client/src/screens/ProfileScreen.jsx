import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
// components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// actions/constants
import {
  getUserDetails,
  inactive,
  updateUserProfile,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Meta from "../components/Meta";
import { setAlert } from "../actions/alert";

const ProfileScreen = () => {
  // hooks
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      password1: password,
      password2: confirmPassword,
    });
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    //Will want to check if the User is logged in, if not redirect
    //This comes from userLogin
    if (!userInfo) {
      navigate(`/login`);
    } else {
      if (!user.firstName || success) {
        //Here the route will connect to /api/users/profile instead of
        // /api/users/{id}
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
      } else {
        //Else Fill forms
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setGender(user.sex);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, success, user, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          gender,
          email,
          password,
        })
      );
    }
  };
  const inactiveHandler = (id) => {
    if (
      window.confirm(
        "This flips your account inactive, doing so removes the ability for you to log in, to continue using the service youll either have to create a new account or contact support to unlock your account"
      )
    ) {
      dispatch(inactive(id));
    }
  };

  return (
    <Row>
      <Meta title={`Honey Do | Profile`} />
      {success && <Message variant="success">Profile Updated</Message>}
      {loading && <Loader />}
      <FormContainer>
        <h3>User Profile</h3>
        <Form onSubmit={submitHandler} style={{ fontFamily: "sans-serif" }}>
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
          <Form.Group>
            <Form.Label>Sex</Form.Label>
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
          </Form.Group>
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
                    <i className="fas fa-exclamation-circle" /> Passwords must
                    Match
                  </span>
                </Form.Text>
              )
            ) : (
              <div></div>
            )}
          </Form.Group>
          <Container style={{ padding: "5%" }}>
            <Button type="submit" variant="success" style={{ width: "75%" }}>
              Update
            </Button>
          </Container>
          <Container>
            <Button
              onClick={() => inactiveHandler(user._id)}
              variant="danger"
              style={{ width: "75%" }}
              disabled={userInfo.isAdmin}
            >
              Delete
            </Button>
          </Container>
        </Form>
      </FormContainer>
    </Row>
  );
};

export default ProfileScreen;
