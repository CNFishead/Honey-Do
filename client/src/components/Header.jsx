import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container className="header-container">
      <div className="heading-logo">
        <h1>Honey-Do List</h1>
      </div>
      <div>
        <Link to="/" className="heading-link">
          <h3>Home</h3>
        </Link>
        <Link to="/login" className="heading-link">
          <h3>Login</h3>
        </Link>
        <Link to="/register" className="heading-link">
          <h3>Register</h3>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
