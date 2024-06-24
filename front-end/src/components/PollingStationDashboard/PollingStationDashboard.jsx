import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./PollingStationDashboard.css";

// Functional component for Polling Station Dashboard
const PollingStationDashboard = () => {
  // State variable to store polling station username
  const [pollingStationUsername, setPollingStationUsername] = useState('');

  // useEffect to fetch and set the polling station username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('pollingStationUsername');
    if (storedUsername) {
      setPollingStationUsername(storedUsername);
    }
  }, []);

  // Handler for clicking on the Voting Form card
  const handleVotingFormClick = () => {
    console.log('Navigate to Voting Form');
  };

  // Handler for clicking on the Candidates Registration card
  const handleCandidatesRegistrationClick = () => {
    console.log('Navigate to Candidates Registration');
  };

  // Render the Polling Station Dashboard component
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Polling Station Dashboard</h2>
        <div className="user-info">
          <p>Welcome, {pollingStationUsername}</p>
          <Link to="/pollingStationLogin">Logout</Link>
        </div>
      </div>
      <div className="dashboard-card-container">
        {/* Candidates Registration Card */}
        <div className="dashboard-candidates-box" onClick={handleCandidatesRegistrationClick}>
          <img src="src/assets/Registration.jpeg" alt="" />
          <div className="dashboard-candidates-layer">
            <h4>Candidate Registration</h4>
            <p>Seamlessly register as a candidate from the convenience of your device. Complete your candidate registration online, providing the necessary information securely.</p>
            <Link to="/CandidateForm"><i className='bx bx-link-external'></i></Link>
          </div>
        </div>

        {/* Online Voting Card */}
        <div className="dashboard-candidates-box" onClick={handleVotingFormClick}>
          <img src="src/assets/voters.jpg" alt="" />
          <div className="dashboard-candidates-layer">
            <h4>Online Voting</h4>
            <p>An online platform that enables individuals to cast their votes electronically, providing a convenient and accessible method for participating in elections or decision-making processes.</p>
            <Link to="/VoterAuthentication"><i className='bx bx-link-external'></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PollingStationDashboard;
