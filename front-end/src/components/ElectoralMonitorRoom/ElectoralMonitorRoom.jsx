import "./ElectoralMonitorRoom.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component for Electoral Monitor Room
const ElectoralMonitorRoom = () => {
  // State variable to store voting records data
  const [votingRecords, setVotingRecords] = useState([]);

  // useEffect to fetch voting records data from the server on component mount
  useEffect(() => {
    // Fetch voting records data from the server
    axios.get('http://localhost:8081/voting_records')
      .then(response => {
        setVotingRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching voting records:', error);
      });
  }, []);

  // Render the Electoral Monitor Room component
  return (
    <div className="electoral-monitor-room">
      <h2>Voting Records</h2>
      {/* Table displaying voting records information */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voter ID</th>
            <th>Candidate Name</th>
            <th>Candidate ID</th>
            <th>Vote Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through voting records array and render a table row for each record */}
          {votingRecords.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.voter_id}</td>
              <td>{record.candidate_name}</td>
              <td>{record.candidate_id}</td>
              <td>{record.vote_timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ElectoralMonitorRoom;
