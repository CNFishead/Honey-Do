import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import Reset from "./screens/Reset";
import ResetPassword from "./screens/ResetPassword";

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
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
