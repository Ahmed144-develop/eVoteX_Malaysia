import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise'; 
import cors from 'cors';

const port = process.env.PORT || 8081;
const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// Create connection to MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'evotex.db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
//To get data from MySQL database
app.get('/getData', (req, res) => {
  const responseData = { message: 'Data from the server' };
  res.json(responseData);
});
async function verifyDatabaseConnection() {
  let connection;
  try {
    connection = await pool.getConnection(); 
    console.log('Successfully connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
verifyDatabaseConnection();


// Signup endpoint with password hashing
app.post('/signup', async (req, res) => {
  const { Name, Email, ID_Number, password } = req.body;
  const sqlSignup = "INSERT INTO login (Name, Email, ID_Number, password) VALUES (?, ?, ?, ?)";
 
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.execute(sqlSignup, [Name, Email, ID_Number, hashedPassword]);
 
    const formattedResult = {
      id: result.insertId,
      affectedRows: result.affectedRows,
    };
 
    res.json({ success: true, result: formattedResult });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});
 

// Login endpoint 
app.post('/login', async (req, res) => {
  try {
    const { ID_Number, password } = req.body;
    console.log('Received login request:', { ID_Number, password }); 

    const sqlLogin = "SELECT * FROM login WHERE ID_Number = ?";
    const [users] = await pool.execute(sqlLogin, [ID_Number]);

    if (users.length > 0) {
      const user = users[0]; 
      console.log('User found in the database:', user); 

      const storedHashedPassword = user.password;
      const isAdmin = user.isAdmin;  
      const adminID = 'admin_ID';
      const adminPassword = 'Admin123';

      if (ID_Number === adminID && password === adminPassword) {
        // Admin login
        console.log('Admin login successful'); 
        res.json({ success: true, redirectPath: '/adminPanel' });
        return;
      }

      const match = await bcrypt.compare(password, storedHashedPassword);

      if (match) {
        // Regular user login
        console.log(`User with ID ${ID_Number} has successfully logged in.`);

        if (isAdmin) {
          // Redirect admin to admin panel
          res.json({ success: true, redirectPath: '/adminPanel' });
        } else {
          // Redirect regular user to Home
          res.json({ success: true, redirectPath: '/Home' });
        }
      } else {
        // Incorrect password
        console.log('Incorrect password'); 
        res.json({ success: false, message: 'Incorrect password' });
      }
    } else {
      // User not found
      console.log('User not found'); 
      res.json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});



// CandidateForm endpoint
app.post('/CandidateForm', async (req, res) => {
  const { fullName, age, citizenship, partyName, partyEndorsement, email, phoneNumber, ID_Number, constituency, platform, campaignFile, depositPhoto, agree } = req.body;
  const sql = "INSERT INTO candidates (fullName, age, citizenship, partyName, partyEndorsement, email, phoneNumber, ID_Number, constituency, platform, agree, campaignFile, depositPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    await pool.execute(sql, [fullName, age, citizenship, partyName, partyEndorsement, email, phoneNumber, ID_Number, constituency, platform, agree, campaignFile, depositPhoto]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to insert data into the database:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// Endpoint to get all candidates
app.get('/candidates', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM candidates');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Failed to retrieve candidates from the database:', err);
    res.status(500).json({ success: false, error: 'Error retrieving candidates from the database' });
  }
});

// Endpoint to get individual candidate by ID
app.get('/candidate/:id', async (req, res) => {
  try {
    const candidateId = req.params.id;
    const [rows] = await pool.query('SELECT * FROM candidates WHERE id = ?', [candidateId]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]); 
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (err) {
    console.error('Failed to retrieve candidate from the database:', err);
    res.status(500).json({ success: false, error: 'Error retrieving candidate from the database' });
  }
});


// Get All Polling Stations location information
app.get('/polling-stations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM polling_stations');

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: 'No polling stations found' });
    }
  } catch (err) {
    console.error('Failed to retrieve polling stations from the database:', err);
    res.status(500).json({ success: false, error: 'Error retrieving polling stations from the database' });
  }
});

// Get Polling Station location by Voter ID
app.get('/polling-station/:voter_id', async (req, res) => {
  try {
    const voterId = req.params.voter_id;

    // Use FIND_IN_SET to search for the voter ID in the comma-separated list
    const [rows] = await pool.query('SELECT * FROM polling_stations WHERE FIND_IN_SET(?, voter_id) > 0', [voterId]);

    if (rows.length > 0) {
      res.status(200).json({ success: true, location: rows[0].name, details: rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Polling station not found' });
    }
  } catch (err) {
    console.error('Failed to retrieve polling station from the database:', err);
    res.status(500).json({ success: false, error: 'Error retrieving polling station from the database' });
  }
});

// Endpoint to get the eligibility list
app.get('/get-eligibility-list', async (req, res) => {
  try {
    const [eligibilityList] = await pool.query('SELECT * FROM eligibility');
    
    res.json({
      success: true,
      eligibilityList,
    });
  } catch (error) {
    console.error('Failed to retrieve eligibility list:', error);
    res.status(500).json({
      success: false,
      error: 'Error retrieving eligibility list',
    });
  }
});

// Endpoint to toggle eligibility status
app.post('/toggle-eligibility', async (req, res) => {
  const { id, currentStatus } = req.body;

  try {
// Toggle the eligibility status in the database
    const updatedStatus = !currentStatus;

    await pool.query('UPDATE eligibility SET is_eligible = ? WHERE id = ?', [updatedStatus, id]);

// Fetch the updated eligibility list
    const [eligibilityList] = await pool.query('SELECT * FROM eligibility');

    res.json({
      success: true,
      eligibilityList,
    });
  } catch (err) {
    console.error('Error toggling eligibility status:', err);
    res.status(500).json({
      success: false,
      error: 'Error toggling eligibility status',
    });
  }
});

//end point to check eligible status
app.post('/check-eligibility', async (req, res) => {
  const { ID_Number } = req.body;
  console.log('Received check eligibility request for ID_Number:', ID_Number);

  const query = 'SELECT * FROM eligibility WHERE ID_Number = ?';

  try {
    const [results] = await pool.query(query, [ID_Number]);

    console.log('Results from the database:', results);

    if (results.length > 0) {
      const voter = results[0];
      res.json({ success: true, isEligible: voter.is_eligible });
    } else {
      res.json({ success: false, error: 'Voter not found in eligibility list' });
    }
  } catch (err) {
    console.error('Error executing database query:', err);  
    res.json({ success: false, error: 'Error executing database query' });
  }
});

// Polling Station Login endpoint
app.post('/pollingStationLogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    const sqlLogin = "SELECT * FROM polling_station_login WHERE username = ?";
    const [users] = await pool.execute(sqlLogin, [username]);

    if (users.length > 0) {
      const user = users[0];

      const storedPassword = (user && user.password) ? user.password.trim() : null;

      if (storedPassword !== null) {
        if (password === storedPassword) {
          console.log(`Polling station with username ${username} has successfully logged in.`);
          res.json({ success: true, username: username, redirectPath: '/pollingStationDashboard' });
          return; 
        } else {
          // Incorrect password
          console.log('Incorrect password');
          res.json({ success: false, message: 'Incorrect password' });
        }
      } else {
        // Password not found in the database
        console.log('Password not found');
        res.json({ success: false, message: 'Password not found' });
      }
    } else {
      // Polling station not found
      console.log('Polling station not found');
      res.json({ success: false, message: 'Polling station not found' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.post('/voterLogin', async (req, res) => {
  const { voterId, password } = req.body;

  try {
    const sqlQuery = "SELECT * FROM login WHERE ID_Number = ?";
    const [rows] = await pool.execute(sqlQuery, [voterId]);

    if (rows.length > 0) {
      const user = rows[0];
      const hashedPassword = user.password; 

      // Compare the provided password with the stored hashed password
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        // Passwords match
        res.json({ success: true });
      } else {
        // Passwords don't match
        res.json({ success: false, message: 'Invalid ID or password.' });
      }
    } else {
      // Voter ID not found
      res.json({ success: false, message: 'Voter ID not found.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Get voter's name by ID_Number
app.get('/login/:ID_Number', async (req, res) => {
  const idNumber = req.params.ID_Number;

  try {
    const sqlQuery = "SELECT Name FROM login WHERE ID_Number = ?";
    const [rows] = await pool.execute(sqlQuery, [idNumber]);

    if (rows.length > 0) {
      res.json({ name: rows[0].Name });
    } else {
      res.status(404).json({ message: 'Voter not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/record-vote', async (req, res) => {
  const { voterId, candidateId } = req.body;

  try {
    // Check if the voter has already voted
    const [existingVotes] = await pool.query('SELECT * FROM voting_records WHERE voter_id = ?', [voterId]);

    if (existingVotes.length > 0) {
      // Voter has already voted
      return res.status(400).json({ success: false, message: 'Voter has already voted.' });
    }

    // Fetch candidate's full name using candidateId
    const [candidateData] = await pool.query('SELECT fullName FROM candidates WHERE id = ?', [candidateId]);
    if (candidateData.length === 0) {
      // No candidate found with the given ID
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }
    const candidateName = candidateData[0].fullName;

    
    const [result] = await pool.query(
      'INSERT INTO voting_records (voter_id, candidate_id, candidate_name) VALUES (?, ?, ?)',
      [voterId, candidateId, candidateName]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Vote recorded successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Vote was not recorded' });
    }
  } catch (err) {
    console.error('Error recording vote:', err);
    res.status(500).json({ success: false, error: 'Error recording vote' });
  }
});

// Endpoint to get voting records
app.get('/voting_records', async (req, res) => {
  try {
    const [votingRecords] = await pool.query('SELECT * FROM voting_records');

    res.status(200).json(votingRecords);
  } catch (error) {
    console.error('Error fetching voting records:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Endpoint to get voting results
app.get('/results', async (req, res) => {
  try {
    const sql = `
    SELECT
    c.id,
    c.fullName,
    c.partyName,
    COUNT(vr.candidate_id) AS votes,
    RANK() OVER (ORDER BY COUNT(vr.candidate_id) DESC, c.fullName ASC) AS rank
  FROM
    candidates c
  LEFT JOIN
    voting_records vr ON c.id = vr.candidate_id
  GROUP BY
    c.id, c.fullName, c.partyName
  ORDER BY
    votes DESC, c.fullName ASC;
    `;

    console.log('SQL Query:', sql); // Debug: Log the SQL query

    const [results] = await pool.query(sql);

    // Debug: Log out the results
    console.log('Results:', results);

    // Sending back the aggregated voting results
    res.json({ success: true, results });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// Endpoint to get the total number of voters who have voted
app.get('/totalVoters', async (req, res) => {
  try {
    const sql = `
      SELECT COUNT(DISTINCT voter_id) AS totalVoters
      FROM voting_records;
    `;

    const [result] = await pool.query(sql);

    // Debug: Log out the total number of voters
    console.log('Total Voters:', result[0].totalVoters);

    // Sending back the total number of voters
    res.json({ success: true, totalVoters: result[0].totalVoters });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Starting the server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});