import "./Candidateslist.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component for Candidates List
const CandidatesList = () => {
  // State variable to store candidates data
  const [candidates, setCandidates] = useState([]);

  // useEffect to fetch candidates data from the server on component mount
  useEffect(() => {
    // Fetch candidates data from the server
    axios.get('http://localhost:8081/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  // Render the Candidates List component
  return (
    <div className="candidates-list">
      <h2>Candidates List</h2>
      {/* Table displaying candidates information */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Citizenship</th>
            <th>Party Name</th>
            <th>Party Endorsement</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>ID_Number</th>
            <th>Constituency</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through candidates array and render a table row for each candidate */}
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.fullName}</td>
              <td>{candidate.age}</td>
              <td>{candidate.citizenship}</td>
              <td>{candidate.partyName}</td>
              <td>{candidate.partyEndorsement}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phoneNumber}</td>
              <td>{candidate.ID_Number}</td>
              <td>{candidate.constituency}</td>
              <td>{candidate.platform}</td>.
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the Candidates List component
export default CandidatesList;
