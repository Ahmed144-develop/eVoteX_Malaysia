import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './CandidateForm.css';
import { CandidateFormValidation } from './CandidateFormValidation';

// Functional component for Candidate Form
const CandidateForm = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // State variables for form steps, errors, and form values
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    fullName: '',
    age: '',
    citizenship: '',
    partyName: '',
    partyEndorsement: '',
    email: '',
    phoneNumber: '',
    ID_Number: '',
    constituency: '',
    platform: '',
    agree: false,
    campaignFile: '',
    depositPhoto: '',
  });

   // Function to handle input changes
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = CandidateFormValidation(values);
    setErrors(validationErrors);
    console.log('Validation errors:', validationErrors);
  
    // Check if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      if (step === 3) {
        console.log('Submitting form:', values); 
        // Perform the submission logic
        axios.post('http://localhost:8081/CandidateForm', values)
          .then(response => {
            console.log(response.data);
            navigate('/Candidates');
          })
          .catch((err) => console.log(err));
      } else {
        console.log('Moving to the next step:', values); 
        setStep((prevStep) => prevStep + 1);
      }
    } else {
      console.log('Validation errors detected:', validationErrors); 
    }
  };


  // Render the Candidate Form component
  return (
    <div className="candidate-form-container">
      <form className="candidate-form" onSubmit={handleSubmit}>
        <h1>Candidate Registration Form</h1>

        {/* Full Name */}
        {step === 1 && (
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleInput}
              required
            />
            {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
          </div>
        )}

        {/* Age */}
        {step === 1 && (
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={handleInput}
              required
            />
            {errors.age && <span className="text-danger">{errors.age}</span>}
          </div>
        )}

        {/* ID Number */}
        {step === 1 && (
          <div>
            <label htmlFor="ID_Number">ID Number:</label>
            <input
              type="text"
              id="ID_Number"
              name="ID_Number"
              value={values.ID_Number}
              onChange={handleInput}
              required
            />
            {errors.ID_Number && <span className="text-danger">{errors.ID_Number}</span>}
          </div>
        )}

        {/* Phone Number */}
        {step === 1 && (
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleInput}
              required
            />
            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
          </div>
        )}

        {/* Email */}
        {step === 1 && (
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              required
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
        )}

        {/* Citizenship */}
        {step === 2 && (
          <div>
            <label htmlFor="citizenship">Citizenship:</label>
            <input
              type="text"
              id="citizenship"
              name="citizenship"
              value={values.citizenship}
              onChange={handleInput}
              required
            />
            {errors.constituency && <span className="text-danger">{errors.constituency}</span>}
          </div>
        )}

        {/* Party Name */}
        {step === 2 && (
          <div>
            <label htmlFor="partyName">Political Party Name:</label>
            <input
              type="text"
              id="partyName"
              name="partyName"
              value={values.partyName}
              onChange={handleInput}
              required
            />
            {errors.partyName && <span className="text-danger">{errors.partypartyName}</span>}
          </div>
        )}

        {/* Party Endorsement */}
        {step === 2 && (
          <div>
            <label htmlFor="partyEndorsement">Political Party Endorsement:</label>
            <input
              type="text"
              id="partyEndorsement"
              name="partyEndorsement"
              value={values.partyEndorsement}
              onChange={handleInput}
              required
            />
            {errors.partyEndorsement && <span className="text-danger">{errors.partyEndorsement}</span>}
          </div>
        )}

        {/* Constituency */}
        {step === 2 && (
          <div>
            <label htmlFor="constituency">Constituency:</label>
            <input
              type="text"
              id="constituency"
              name="constituency"
              value={values.constituency}
              onChange={handleInput}
              required
            />
            {errors.constituency && <span className="text-danger">{errors.constituency}</span>}
          </div>
        )}

        {/* Platform */}
        {step === 3 && (
          <div>
            <label htmlFor="platform">Campaign Platform:</label>
            <textarea
              id="platform"
              name="platform"
              value={values.platform}
              onChange={handleInput}
              rows="4"
              required
            ></textarea>
            {errors.platform && <span className="text-danger">{errors.platform}</span>}
          </div>
        )}

        {/* Campaign File Upload */}
        {step === 3 && (
          <div>
            <label htmlFor="campaignFile">Campaign File:</label>
            <input
              type="file"
              id="campaignFile"
              name="campaignFile"
              onChange={handleInput}
              accept=".pdf, .doc, .docx"
            />
          </div>
        )}

        {/* Deposit Photo Upload */}
        {step === 3 && (
          <div>
            <label htmlFor="depositPhoto">Deposit Photo:</label>
            <input
              type="file"
              id="depositPhoto"
              name="depositPhoto"
              onChange={handleInput}
              accept="image/*"
            />
          </div>
        )}

        {/* Agreement and Submission */}
        {step === 3 && (
          <div className="candidate-form-checkbox">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={values.agree}
              onChange={handleInput}
              required
            />
            <label htmlFor="agree">I agree to the terms and conditions.</label>
            {errors.agree && <span className="text-danger">{errors.agree}</span>}
          </div>
        )}

<div className="candidate-form-navigation">
          {step > 1 && (
            <button type="button" onClick={() => setStep((prevStep) => prevStep - 1)}>
              Previous
            </button>
          )}

          {step < 3 && <button type="button" onClick={() => setStep((prevStep) => prevStep + 1)}>Next</button>}

          {step === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
