import "./AdminPanel.css"
import { Link } from "react-router-dom";

// Functional component for Admin Panel
const AdminPanel = () => {
  // Render the Admin Panel component
  return (
    <section className="admin-panel" id="admin-panel">
      <h2 className="heading">Admin <span> Panel </span> </h2>

      {/* Logout link */}
      <Link to="/pollingStationLogin">Logout</Link>

      {/* Link to Website Home Page */}
      <Link to="/Home">Website Home Page </Link>

      {/* Admin Panel Container with different functional boxes */}
      <div className="admin-panel-container">
        {/* Candidates List Box */}
        <div className="admin-panel-box">
          <img src="src/assets/Candidates.png" alt="" />
          <div className="admin-panel-layer">
            <h4>Candidates List</h4>
            <p>View the list of candidates participating in the election. Manage candidate information (Delete/edit).</p>
            <a href="/CandidatesList"><i className='bx bx-link-external'></i></a>
          </div>
        </div>

        {/* Electoral Monitor Room Box */}
        <div className="admin-panel-box">
          <img src="src/assets/monitor.png" alt="" />
          <div className="admin-panel-layer">
            <h4>Electoral Monitor Room</h4>
            <p>Access the electoral monitor room to oversee and manage the election process, including real-time updates and decision-making tools.</p>
            <a href="/ElectoralMonitorRoom"><i className='bx bx-link-external'></i></a>
          </div>
        </div>

        {/* Eligible Voters List Box */}
        <div className="admin-panel-box">
          <img src="src/assets/Eligable.png" alt="" />
          <div className="admin-panel-layer">
            <h4>Eligible Voters List</h4>
            <p>View and manage the list of eligible voters who can participate in the election.</p>
            <a href="/EligibleVotersList"><i className='bx bx-link-external'></i></a>
          </div>
        </div>

        {/* Election Results Box */}
        <div className="admin-panel-box">
          <img src="src/assets/election.png" alt="" />
          <div className="admin-panel-layer">
            <h4>Election Results</h4>
            <p>View the Results of the election</p>
            <a href="/Results"><i className='bx bx-link-external'></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AdminPanel;
