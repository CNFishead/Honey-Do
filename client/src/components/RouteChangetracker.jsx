import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangetracker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  location.listen(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default RouteChangetracker;
