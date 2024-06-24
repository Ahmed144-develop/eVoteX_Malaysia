import "./PollingStationLogin.css";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Functional component for Polling Station Login
const PollingStationLogin = () => {
    // State variables to manage username, password, and error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // React Router hook for navigation
    const navigate = useNavigate();

    // Function to handle login logic
    const handleLogin = async () => {
        try {
            // Check if the username is "Admin" and the password is "admin123"
            if (username.toLowerCase() === 'admin' && password === 'admin123') {
                // Redirect to the admin panel
                navigate('/AdminPanel');
                return;
            }
    
            // If not admin login, proceed with the regular login logic
            const response = await Axios.post('http://localhost:8081/pollingStationLogin', { username, password });
    
            // Check if the login was successful
            if (response.data.success) {
                // Store the username in localStorage
                localStorage.setItem('pollingStationUsername', response.data.username);
    
                // Navigate to the dashboard
                navigate('/PollingStationDashboard');
            } else {
                // If credentials are invalid, set the error message
                setError(response.data.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };
    
    // Render the Polling Station Login component
    return (
        <div className="station-login">
            <div className="station-box">
                <div className="station-logo">
                    <img src="src/assets/website logo.png" alt="Logo" />
                </div>
                <h2 className="station-h2">Polling Station Login</h2>
                <div className="station-container">
                    <div className="station-pass">
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="station-pass">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="station-enter" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default PollingStationLogin;
