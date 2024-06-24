import { useState, useEffect } from 'react';
import './voting.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VoteForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState('');
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState('Submit Vote');
  const [voteStatus, setVoteStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voterName, setVoterName] = useState('');
  const navigate = useNavigate();


  const handleAuthenticationNavigation = () => {
    navigate('/VoterAuthentication'); 
  };

  const location = useLocation();
  const voterIdNumber = location.state?.voterId;

  useEffect(() => {
    setIsLoading(true);
    const fetchVoterNameAndCandidates = async () => {
      try {
        if (voterIdNumber) {
          const voterNameResponse = await axios.get(`http://localhost:8081/login/${voterIdNumber}`);
          setVoterName(voterNameResponse.data.name);
        } else {
          // If voterIdNumber is not provided, handle this case appropriately
          setVoteStatus('No voter ID provided.');
        }
  
        const candidatesResponse = await axios.get('http://localhost:8081/candidates');
        setCandidates(candidatesResponse.data);
        
      } catch (error) {
        console.error('An error occurred:', error);
        setVoteStatus(error.response?.data?.message || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchVoterNameAndCandidates();
  }, [voterIdNumber]);

  const fetchCandidateInfo = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/candidate/${id}`);
    const candidateData = response.data;

    console.log('Candidate information:', candidateData);

    setCandidateInfo(candidateData);
  } catch (error) {
    console.error('Error fetching candidate information:', error);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (candidate) {
      try {
          setIsLoading(true);

          // Insert a record into the voting_records table
          await axios.post('http://localhost:8081/record-vote', {
              voterId: voterIdNumber,
              candidateId: candidate
          });

          setSubmitButtonText('Vote Submitted!');
      } catch (error) {
          console.error('Error submitting vote:', error);
          setVoteStatus('Error submitting vote. Please try again.');
      } finally {
          setIsLoading(false);
      }
  } else {
      setVoteStatus('Please select a candidate before submitting.');
  }
};


  return (
    <div className="card">
      <div className="vote-form-container">
        <form onSubmit={handleSubmit}>
          <h1>Vote for Your Candidate</h1>
          <h2>Welcome, {voterName}</h2>
          <label htmlFor="candidate">
            Candidate {'   '}
            <select
              id="candidate"
              value={candidate}
              onChange={(e) => {
                const selectedCandidateId = e.target.value;
                setCandidate(selectedCandidateId);
                setVoteStatus(null);
                if (selectedCandidateId) {
                  fetchCandidateInfo(selectedCandidateId);
                } else {
                  setCandidateInfo(null);
                }
              }}
            >
              <option value="">Select a candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.fullName}
                </option>
              ))}
            </select>
          </label>
          {candidateInfo && (
            <div className="candidate-info">
              <h2>{candidateInfo.fullName}</h2>
              <p>Age: {candidateInfo.age}</p>
              <p>Political Party Name: {candidateInfo.partyName}</p>
              <p>Political Party Endorsement: {candidateInfo.partyEndorsement}</p>
              <p>Platform: {candidateInfo.platform}</p>
              <p>Constituency: {candidateInfo.constituency}</p>
            </div>
          )}

          {isLoading && <p>Loading...</p>}
          {voteStatus && <p className="vote-status">{voteStatus}</p>}
          <div className="voting-options">
            <button type="submit" disabled={isLoading}>
              {submitButtonText}
            </button>
            <button type="button" onClick={() => setSubmitButtonText('Not Voted')} disabled={isLoading}>
              Not Vote
            </button>
            <button type="button" onClick={handleAuthenticationNavigation}>
              Go to Voter Authentication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteForm;
