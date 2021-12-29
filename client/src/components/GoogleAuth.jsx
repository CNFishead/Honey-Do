// /components/GoogleAuth.tsx
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useSelector } from "react-redux";

const GoogleAuth = () => {
  // App state
  const { userInfo } = useSelector((state) => state.userLogin);

  const onSuccess = async (response) => {
    try {
      const { data } = await axios.post("/api/auth/google", {
        token: response.tokenId,
      });
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      document.location.href = "/";
    } catch (e) {}
  };
  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="147960290260-ed8f467485mtet57gk1mnjplgkpccbgt.apps.googleusercontent.com"
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant="danger"
          style={{
            width: "100%",
            margin: "2% 0",
          }}
        >
          <i class="fab fa-google" /> Sign In with Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
