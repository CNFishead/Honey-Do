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

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import RouteChangetracker from "./components/RouteChangetracker";

// css styles
import "./App.css";

const App = () => {
  // Google analytic stuff
  ReactGA.initialize("G-HM8EEJ6ZMF", {
    titleCase: false,
    gaOptions: {
      userId: 123,
    },
  });

  return (
    <>
      {/* RouteChangetracker tracks the pages as the customer moves about the page. */}
      <Router>
        <RouteChangetracker />
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
          </Routes>
          <Footer />
        </Container>
      </Router>
    </>
  );
};

export default App;
