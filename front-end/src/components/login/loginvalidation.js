function validation(values) {
  let error = {};
  const ID_pattern = /^[0-9]{6}-[0-9]{2}-[0-9]{4}$/;
  const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  
  if (values.Email === "") {
    error.Email = "Email should not be empty";
  } else if (!email_pattern.test(values.Email)) {
    error.Email = "Invalid email format";
  } else {
    error.Email = "";
  }

  if (values.ID_Number === "") {
    error.ID_Number = "IC Number should not be empty";
  } else if (!ID_pattern.test(values.ID_Number)) {
    error.ID_Number = "Invalid IC Number format";
  } else {
    error.ID_Number = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't match";
  } else {
    error.password = "";
  }

  return error;
}

export { validation };
