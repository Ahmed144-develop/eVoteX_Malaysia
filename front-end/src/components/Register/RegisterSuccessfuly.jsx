import "./RegisterSuccessfuly.css"
import {Link} from 'react-router-dom'
const SuccessRegister = () => {

  return (
    <div className="message">
      <h1>Registration Successful!</h1>  
      <p>Your account has been successfully created. You can now log in using your credentials.</p>
      <Link to="/VoterAuthentication" className="button">Online Voteing Login</Link> 
      <Link to="/Home" className="button">Home</Link> 
    </div>
  );  
}

export default SuccessRegister;