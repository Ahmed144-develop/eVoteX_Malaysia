import "./EligibleVotersList.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component for Eligibility List
const EligibilityList = () => {
  // State variables to store eligibility list data and loading status
  const [eligibilityList, setEligibilityList] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch eligibility list data from the server on component mount
  useEffect(() => {
    // Function to fetch eligibility list data
    const fetchEligibilityList = async () => {
      try {
        const response = await axios.get('http://localhost:8081/get-eligibility-list');
        const data = response.data;

        // Update state with the fetched eligibility list data
        if (data.success) {
          setEligibilityList(data.eligibilityList);
        } else {
          console.error('Failed to fetch eligibility list:', data.error);
        }
      } catch (error) {
        console.error('Error fetching eligibility list:', error);
      } finally {
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };

    // Call the fetchEligibilityList function
    fetchEligibilityList();
  }, []);

  // Function to toggle eligibility status of a voter
  const toggleEligibility = async (id, currentStatus) => {
    try {
      const response = await axios.post('http://localhost:8081/toggle-eligibility', {
        id,
        currentStatus,
      });

      // Update state with the updated eligibility list data
      if (response.data.success) {
        setEligibilityList(response.data.eligibilityList);
      } else {
        console.error('Failed to toggle eligibility status:', response.data.error);
      }
    } catch (error) {
      console.error('Error toggling eligibility status:', error);
    }
  };

  // Render the Eligibility List component
  return (
    <div className="card">
      <div className="eligibility-list-container">
        <h1>Eligibility List</h1>
        {/* Display loading message while data is being fetched */}
        {loading && <p>Loading eligibility list...</p>}
        {/* Display message if no eligible voters are found */}
        {!loading && eligibilityList.length === 0 && <p>No eligible voters found.</p>}
        {/* Display table if there are eligible voters */}
        {!loading && eligibilityList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>ID Number</th>
                <th>Age</th>
                <th>Address</th>
                <th>Eligibility Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through eligibility list and render a table row for each voter */}
              {eligibilityList.map((voter) => (
                <tr key={voter.id}>
                  <td>{voter.id}</td>
                  <td>{voter.name}</td>
                  <td>{voter.ID_Number}</td>
                  <td>{voter.age}</td>
                  <td>{voter.address}</td>
                  {/* Display eligibility status as 'Eligible' or 'Not Eligible' */}
                  <td>{voter.is_eligible ? 'Eligible' : 'Not Eligible'}</td>
                  {/* Button to toggle eligibility status */}
                  <td>
                    <button
                      onClick={() => toggleEligibility(voter.id, voter.is_eligible)}
                    >
                      Toggle Eligibility
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};


export default EligibilityList;
