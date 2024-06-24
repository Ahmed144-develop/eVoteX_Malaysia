import { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import axios from 'axios'; 
import './Map.css';

// Functional component for Voters Map
const VotersMap = () => {
  // State variables to store electoral headquarters data, voter ID, station details, and loading status
  const [electoralHeadquarters, setElectoralHeadquarters] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [stationDetails, setStationDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect to fetch station details when voterId changes
  useEffect(() => {
    // Function to fetch station details
    const fetchStationDetails = async () => {
      if (voterId) {
        try {
          setLoading(true);
          console.log('Making request to:', `http://localhost:8081/polling-station/${voterId}`);
          const response = await axios.get(`http://localhost:8081/polling-station/${voterId}`);
          console.log('Response:', response);
    
          if (response.status === 200) {
            if (response.data.success) {
              setElectoralHeadquarters(response.data.location);
              setStationDetails(response.data.details);
            } else {
              alert(response.data.error);
            }
          } else {
            alert(`Error: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert(`An unexpected error occurred. Please try again later. Error details: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    };
    
    // Call the fetchStationDetails function
    fetchStationDetails();
  }, [electoralHeadquarters, voterId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/polling-station/${voterId}`);

      if (response.status === 200) {
        if (response.data.success) {
          setElectoralHeadquarters(response.data.location);
          setStationDetails(response.data.details);
        } else {
          alert(response.data.error);
        }
      } else {
        // Handle non-OK responses (e.g., server error)
        alert(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Render the Voters Map component
  return (
    <div className="card">
      <div className="VotersMap">
        <h1>Electoral Headquarters Finder</h1>
        {/* Form to input voter ID and trigger search */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="voter_id">Enter your Voter ID:</label>
          <input
            type="text"
            id="voter_id"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>
        {/* Display loading message while data is being fetched */}
        {loading && <p>Loading...</p>}
        {/* Display map and station details if available */}
        {electoralHeadquarters && (
          <>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            </MapContainer>

            {stationDetails && (
              <div>
                <p>Station Name: {stationDetails.name}</p>
                <p>Opening Time: {stationDetails.opening_time}</p>
                <p>Closing Time: {stationDetails.closing_time}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


export default VotersMap;
