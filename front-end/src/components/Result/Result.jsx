import { useState, useEffect } from 'react';
import axios from 'axios';
import './Result.css';

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVoters, setTotalVoters] = useState(0);

  // Fetch candidates data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/candidates');
        console.log('Candidates:', response.data); // Debug: Log out the candidates data
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Fetch total voters initially on component mount and update every 5 seconds
  useEffect(() => {
    const fetchTotalVoters = async () => {
      try {
        const responseTotalVoters = await axios.get('http://localhost:8081/totalVoters');
        setTotalVoters(responseTotalVoters.data.totalVoters);
      } catch (error) {
        console.error('Error fetching total voters:', error);
      }
    };

    fetchTotalVoters(); // Fetch once on component mount
    const interval = setInterval(fetchTotalVoters, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Calculate valid votes and invalid votes when candidates or totalVoters changes
  useEffect(() => {
    const validVotes = candidates.reduce((total, candidate) => total + (candidate.votes || 0), 0);
    const invalidVotes = totalVoters - validVotes;
    console.log('Valid Votes:', validVotes); // Debug: Log out valid votes
    console.log('Invalid Votes:', invalidVotes); // Debug: Log out invalid votes
  }, [candidates, totalVoters]);

  // Find the candidate with the highest votes
  const candidateWithHighestVotes = candidates.length > 0 ? candidates.reduce((prev, current) =>
    (prev.votes > current.votes ? prev : current), candidates[0]) : null;

  // Fetch voting results data
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const responseResults = await axios.get('http://localhost:8081/results');
        setCandidates(responseResults.data.results); 
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, []);

  // Render the voting results component
  return (
    <div className="results-container">
      <h1>Voting Results</h1>
      <div className="summary">
        <p>Total Voters: {totalVoters}</p>
        <p>Valid Votes: {candidates.reduce((total, candidate) => total + (candidate.votes || 0), 0)}</p>
        <p>Invalid Votes: {totalVoters - candidates.reduce((total, candidate) => total + (candidate.votes || 0), 0)}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate Name</th>
            <th>Political Party</th>
            <th>Number of Votes</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <td>{index + 1}</td>
                <td>{candidate.fullName}</td>
                <td>{candidate.partyName}</td>
                <td>{candidate.votes}</td>
                <td>{candidateWithHighestVotes && candidate.id === candidateWithHighestVotes.id ? '1' : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No candidates found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
