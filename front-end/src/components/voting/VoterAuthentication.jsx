import "./VoterAuthentication.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const VoterAuthentication = () => {
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!voterId || !password) {
      setError('Please enter both Voter ID and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
        const response = await axios.post('http://localhost:8081/voterLogin', { voterId, password });
      
      if (response.data.success) {
        navigate('/VoteForm', { state: { voterId: voterId } });
      } else {
        setError('Invalid ID or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="voter-authentication">
      <form onSubmit={handleLogin}>
        <label htmlFor="voterIdInput">
          Voter ID:
          <input 
            id="voterIdInput"
            type="text" 
            value={voterId} 
            onChange={(e) => setVoterId(e.target.value)} 
            disabled={isLoading}
          />
        </label>
        <label htmlFor="passwordInput">
          Password:
          <input 
            id="passwordInput"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <Link to="/register" className="register-button"> Register for Voting</Link> 
      </form>
    </div>
  );
};

export default VoterAuthentication;