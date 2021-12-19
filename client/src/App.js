import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import Reset from "./screens/Reset";
import ResetPassword from "./screens/ResetPassword";
import RegisterScreen from "./screens/RegisterScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// css styles
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/resetpassword" element={<Reset />} />
        <Route
          path="/auth/resetpassword/:resettoken"
          element={<ResetPassword />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
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
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
