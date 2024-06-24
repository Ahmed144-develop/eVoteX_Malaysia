import { useState } from "react";
import axios from "axios";
import './Eligibility.css';

// EligibilityCheck component
const EligibilityCheck = () => {
  // State variables
  const [voterInfo, setVoterInfo] = useState({
    ID_Number: '',
  });

  const [isEligible, setIsEligible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Event handler for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Event handler for checking eligibility
  const handleCheckEligibility = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      // Send request to server to check eligibility
      const response = await axios.post('http://localhost:8081/check-eligibility', { ID_Number: voterInfo.ID_Number });
      const { success, isEligible } = response.data;
  
      // Update state based on server response
      if (success) {
        setIsEligible(isEligible);
      } else {
        setError('Failed to check eligibility. Please try again.');
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // JSX structure of the component
  return (
    <div className="card">
      <h2>Check Your Eligibility to Vote</h2>
      {/* Eligibility check form */}
      <form onSubmit={handleCheckEligibility}>
        {/* Input for ID number */}
        <label>
          ID_Number:
          <input
            type="text"
            name="ID_Number"
            value={voterInfo.ID_Number}
            onChange={handleInputChange}
            disabled={loading} // Disable input during loading
          />
        </label>

        {/* Button to check eligibility */}
        <button type="submit" disabled={loading}>
          {loading ? 'Checking Eligibility...' : 'Check Eligibility'}
        </button>
      </form>

      {/* Display error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display eligibility status */}
      {isEligible !== null && (
        <div>
          <p style={{ color: isEligible ? 'green' : 'red' }}>
            {isEligible ? "You are potentially eligible to vote!" : "Sorry, you are not eligible to vote."}
          </p>
        </div>
      )}
    </div>
  );
};

// Export the component
export default EligibilityCheck;
