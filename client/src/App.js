import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactGA from "react-ga";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import Reset from "./screens/Reset";
import ResetPassword from "./screens/ResetPassword";
import RegisterScreen from "./screens/RegisterScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Support from "./screens/Support";
import NotFound from "./screens/NotFound";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import RouteChangetracker from "./components/RouteChangetracker";

// css styles
import "./App.css";
import Alert from "./components/Alert";
import setAuthToken from "./utils/setAuthToken";
import { useSelector } from "react-redux";

const App = () => {
  // Google analytic stuff
  ReactGA.initialize("G-G66N6CNLFY", {
    titleCase: false,
    gaOptions: {
      userId: 123,
    },
  });
  // This sets the common headers for axios
  // if there is a user object, that object has a token
  // set the common header to that token
  const { userInfo } = useSelector((state) => state.userLogin);
  if (userInfo) {
    setAuthToken(userInfo.token);
  }
  return (
    <>
      {/* RouteChangetracker tracks the pages as the customer moves about the page. */}
      <Router>
        <RouteChangetracker />
        <Alert />
        <Container
          fluid
          style={{ height: "100%", widht: "100vw", position: "absolute" }}
        >
          <Header />
          <Routes>
            <Route path="/resetpassword" element={<Reset />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/auth/resetpassword/:resettoken"
              element={<ResetPassword />}
            />
            <Route
              path="/admin/user/:id/edit"
              element={
                <PrivateRoute>
                  <UserEditScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/admin/userlist/:pageNumber"
              element={<UserListScreen />}
              exact
            />
            <Route path="/admin/userlist" element={<UserListScreen />} exact />
            <Route
              path="/admin/userlist/search/:keyword/page/:pageNumber"
              element={<UserListScreen />}
              exact
            />
            <Route path="/" element={<Home />} exact />
            {/* Catch all for routes not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </>
  );
};

export default App;
