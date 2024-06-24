function CandidateFormValidation(values) {
    let errors = {};
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneNumberPattern = /^\d{10}$/;
    const idNumberPattern = /^[0-9]{6}-[0-9]{2}-[0-9]{4}$/;
    
  
    // Full Name
    if (values.fullName === "") {
      errors.fullName = "Full Name should not be empty";
    } else if (values.fullName.length < 7) {
      errors.fullName = "Full Name should be at least 7 characters";
    }
  
    // Age
    if (values.age === "") {
      errors.age = "Age should not be empty";
    }
  
    // Citizenship
    if (values.citizenship === "") {
      errors.citizenship = "Citizenship should not be empty";
    }
  
    // Party Name
    if (values.partyName === "") {
      errors.partyName = "Party Name should not be empty";
    }
  
    // Party Endorsement
    if (values.partyEndorsement === "") {
      errors.partyEndorsement = "Party Endorsement should not be empty";
    }
  
    // Email
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    }
  
    // Phone Number
    if (values.phoneNumber === "") {
      errors.phoneNumber = "Phone Number should not be empty";
    } else if (!phoneNumberPattern.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }
  
    // IC Number
    if (values.ID_Number === "") {
      errors.ID_Number = "IC Number should not be empty";
    } else if (!idNumberPattern.test(values.ID_Number)) {
      errors.ID_Number = "Invalid IC Number format";
    }
  
    // Constituency
    if (values.constituency === "") {
      errors.constituency = "Constituency should not be empty";
    }
  
    // Campaign Platform
    if (values.platform === "") {
      errors.platform = "Campaign Platform should not be empty";
    }
  
    // Agreement
    if (!values.agree) {
      errors.agree = "You must agree to the terms and conditions";
    }
  
    return errors;
  }
  
  export { CandidateFormValidation };
  