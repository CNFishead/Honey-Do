import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangetracker = () => {
  const navigate = useNavigate();
  navigate((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default RouteChangetracker;
