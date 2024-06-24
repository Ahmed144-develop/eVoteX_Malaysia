function Validation(values) {
  let error = {};
  const ID_pattern = /^[0-9]{6}-[0-9]{2}-[0-9]{4}$/;
  const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


  if (values.Name === "") {
    error.Name = "Name should not be empty";
  } else if (values.Name.length < 10) {
    error.Name = "Name should be at least 10 characters";
  } else {
    error.Name = "";
  }

  if (values.Email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.Email)) {
    error.email = "Invalid email format";
  } else {
    error.email = "";
  }

  if (values.ID_Number === "") {
    error.ID_Number = "IC Number should not be empty";
  } else if (!ID_pattern.test(values.ID_Number)) {
    error.ID_Number = "Invalid IC Number format";
  } else {
    // Extract the last digit from the ID number
    const lastDigit = parseInt(values.ID_Number.charAt(values.ID_Number.length - 1));

    // Check gender and age conditions
    if (values.ID_Number.charAt(12) % 2 === 0) {
      // Female ID, should end with an even number
      error.ID_Number = "Female ID should end with an even number";
    } else if (lastDigit % 2 !== 0) {
      // Male ID, should end with an odd number
      error.ID_Number = "Male ID should end with an odd number";
    } else if (calculateAge(values.ID_Number) < 18) {
      // Age should be greater than or equal to 18
      error.ID_Number = "Age must be greater than or equal to 18";
    } else {
      error.ID_Number = "";
    }
  }

  const passwordError = validatePassword(values.password);
if (passwordError !== "") {
  error.password = passwordError;
} else {
  error.password = "";
}

  return error;
}

// Function to calculate age based on the birth year in the ID number
function calculateAge(idNumber) {
  const birthYear = parseInt(idNumber.substring(0, 2));
  const currentYear = new Date().getFullYear();
  const prefix = birthYear >= currentYear % 100 ? "19" : "20";
  const fullYear = parseInt(prefix + idNumber.substring(0, 2));
  return currentYear - fullYear;
}



function validatePassword(password) {
  // Check if password is undefined or null
  if (!password) {
    return "Password should not be empty";
  }

  // Password must be at least 8 characters long
  if (password.length < 8) {
    return "Password should be at least 8 characters long";
  }

  // Password must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password should contain at least one uppercase letter";
  }

  // Password must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password should contain at least one lowercase letter";
  }

  // Password must contain at least one digit
  if (!/\d/.test(password)) {
    return "Password should contain at least one digit";
  }

  // Password must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password should contain at least one special character like !@#$%^&*(),.?\":{}|<>";
  }

  // If all conditions pass, the password is valid
  return "";
}


export { Validation };
