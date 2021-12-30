import React from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangetracker = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
    console.log({ location });
  }, [location]);

  return <div></div>;
};

export default RouteChangetracker;
