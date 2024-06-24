import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { validation } from './loginvalidation.js';
import axios from 'axios';

function Login() {  

  const [values, setValues] = useState({
    ID_Number: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = (errors, values) => {
    if (errors.ID_Number === '' && errors.password === '') {
      if (values.ID_Number === '999999-99-9999' && values.password === 'Admin123') {
        // Admin login
        navigate('/adminPanel');
      } else {
        // Regular user login
        axios.post('http://localhost:8081/login', {
          ID_Number: values.ID_Number,
          password: values.password
        })
        .then((res) => {
          if (res.data.success) {
            navigate(res.data.redirectPath);
          } else {
            alert('Login failed. Please check your credentials.');
          }
        })
        .catch((err) => {
          console.error('Login error:', err.response.data || err);
          alert('An error occurred during login. Please try again later.');
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    handleLogin(validationErrors, values);
  };

  return (
    <div className="login">
      <div className="box">
        <h2 className="h2">Log-in</h2>
        <div className="logo">
          <img src="src/assets/website logo.png" alt="" />
        </div>
        <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <div className="pass">
            <label htmlFor="ID_Number">ID Number</label>
            <input type="text" id="ID_Number" placeholder="Enter your National ID" name="ID_Number" onChange={handleInput} />
            {error.ID_Number && <span className="text-danger"> {error.ID_Number}</span>}
            </div>
            
            <div className="pass">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Password" name="password" onChange={handleInput} />
              {error.password && <span className="text-danger"> {error.password}</span>}
              </div>
              <button type="submit" className="enter">
                Login 
                </button>
                <div className="terms">
                  <input type="checkbox" id="agree" />
                  <label htmlFor="agree">I agree to the terms and policies</label>
                  </div>
                  <Link to="/Register" className="create">
                    Create Account
                    </Link>
                    </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
