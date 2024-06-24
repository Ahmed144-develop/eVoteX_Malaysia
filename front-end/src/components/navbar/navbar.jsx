import { Link } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="nav-container">
      <div className="nav-box">
        <header className="header">
          <a href="#" className="logo">
            eVoteX
          </a>
          <nav className={`nav ${showNav ? 'show' : ''}`}>
            <Link to="/Home" className="activate">
              Home
            </Link>
            <Link to="/AboutSection">About</Link>
            <Link to="/Voters">Voters</Link>
            <Link to="/Candidates">Candidates</Link>
          </nav>
          <Link to="/pollingStationLogin">Polling Station/Admin Login</Link>
          <div className="burger-menu" onClick={toggleNav}>
            &#9776;
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
