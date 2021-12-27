import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let year = dateObj.getUTCFullYear();

  let newdate = month + "/" + year;
  return (
    <footer
      style={{
        textAlign: "center",
        width: "100%",
        padding: "5%",
        bottom: "0",
      }}
    >
      <Container>
        <Row style={{ fontFamily: "sans-serif", fontSize: ".75em" }}>
          <p>Property of Wulf Developments {newdate}</p>
          <p>
            If you are experiencing any issues with the app please{" "}
            <Link to="/support">Contact Us</Link>
          </p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
