import { useNavigate } from "react-router-dom";
import "./singup.css";
import { Validation } from "./singupvalidation";
import { useState } from "react";

// Functional component for user signup
function Singup() {
  // State variables to store form values, errors, and navigation hook
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    ID_Number: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();
  const [error, setErrors] = useState({});

  // Function to handle input changes in the form
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form values and set errors
    setErrors(Validation(values));

    // Check if there are no validation errors and all form values are filled
    if (
      Object.values(error).every((val) => val === "") &&
      Object.values(values).every((val) => val !== "" && val !== false)
    ) {
      try {
        // Send a POST request to the server for user signup
        const response = await fetch("http://localhost:8081/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        // Check if the request was successful
        if (response.ok) {
          // Data stored successfully, navigate to SuccessRegister
          navigate("/SuccessRegister");
        } else {
          // Handle other response statuses if needed
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  // Render the signup form component
  return (
    <div className="login">
      <div className="box">
        <h2>Voters Registration</h2>
        <div className="logo">
          <img src="src/assets/website logo.png" alt="" />
        </div>
        <div className="container">
          <form action="" onSubmit={handleSubmit}>
            {/* Form input fields for user registration */}
            <div className="pass">
              <label htmlFor="Name">Name</label>
              <input type="text" placeholder="Enter your Full Name as in the ID" name="Name" onChange={handleInput} />
              {error.Name && <span className="text-danger"> {error.Name}</span>}
            </div>

            <div className="pass">
              <label htmlFor="Email">Email</label>
              <input type="Email" placeholder="Enter Email" name="Email" onChange={handleInput} />
              {error.Email && <span className="text-danger"> {error.Email}</span>}
            </div>

            <div className="pass">
              <label htmlFor="ID_Number">ID Number</label>
              <input type="text" placeholder="Enter your National ID" name="ID_Number" onChange={handleInput} />
              {error.ID_Number && <span className="text-danger"> {error.ID_Number}</span>}
            </div>

            <div className="pass">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} />
              {error.password && <span className="text-danger"> {error.password}</span>}
            </div>

            {/* Checkbox for terms and policies agreement */}
            <div className="terms">
              <input type="checkbox" id="agree" name="agree" onChange={handleInput} />
              <label htmlFor="agree">I agree to the terms and policies</label>
            </div>

            {/* Submit button for user signup */}
            <button type="submit" className="enter">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Singup;
