import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const ShowNavbar = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const allowedPaths = ['/Home', '/AboutSection', '/Candidates', '/Voters', "/VoterAuthentication"];

    if (allowedPaths.includes(location.pathname)) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [location]);

  return <div>{showNavbar && <>{children}</>}</div>;
};

ShowNavbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShowNavbar;


