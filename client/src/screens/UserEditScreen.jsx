import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { usePasswordValidation } from "../hooks/usePasswordValidation";

// components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// Actions/Constants
import { getUserDetails, updateUser } from "../actions/userActions";
import {
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import Meta from "../components/Meta";

const UserEditScreen = () => {
  // params/navigate;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // component state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      password1: password,
      password2: confirmPassword,
    });

  // App state
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/");
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (user._id !== id || !user.firstName) {
        dispatch(getUserDetails(id));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [navigate, id, dispatch, user, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== "") {
      if (
        validLength &&
        match &&
        hasNumber &&
        upperCase &&
        lowerCase &&
        specialChar
      ) {
        dispatch(updateUser({ _id: id, firstName, lastName, email, password }));
      } else {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: "Password Validation Failed",
        });
      }
    } else {
      dispatch(updateUser({ _id: id, firstName, lastName, email }));
    }
  };

  return (
    <>
      <Meta title={`Admin | Edit: ${firstName}`} />
      <FormContainer>
        <Link
          to="/admin/userlist"
          className="btn btn-dark my-3"
          style={{ width: "100%" }}
        >
          Go Back
        </Link>

        <h1>Edit User Info</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} style={{ fontFamily: "serif" }}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
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
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Container style={{ padding: "2%" }}>
              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  disabled={id === userInfo._id}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            </Container>
            <Button
              type="submit"
              variant="success"
              className="btn-block my-3"
              style={{ width: "100%" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
