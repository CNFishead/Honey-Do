// /components/GoogleAuth.tsx
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const GoogleAuth = ({ message }) => {
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
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="googleButton"
        >
          <i className="fab fa-google" style={{ color: "white" }} /> {message}
        </button>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
