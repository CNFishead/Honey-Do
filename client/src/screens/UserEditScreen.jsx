import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { usePasswordValidation } from "../hooks/usePasswordValidation";

// components

import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// Actions/Constants
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Meta from "../components/Meta";
import { setAlert } from "../actions/alert";

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
  const { loading, user } = useSelector((state) => state.userDetails);
  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.userUpdate
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/");
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(setAlert(`User has been updated`, "success"));
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
        dispatch(
          updateUser({ _id: id, firstName, lastName, email, password, isAdmin })
        );
      } else {
        dispatch(setAlert("Password Validation Failed", "danger"));
      }
    } else {
      dispatch(updateUser({ _id: id, firstName, lastName, email, isAdmin }));
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
        {loading ? (
          <Loader />
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
