const checkValidateData = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Allow any character, but require at least one letter, one digit, min 8 chars
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!email || !password) {
    return { isValid: false, message: "Email and password are required." };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Invalid email format." };
  }

  if (!passwordRegex.test(password)) {
    return { isValid: false, message: "Password must be at least 8 characters and contain both letters and numbers." };
  }

  return { isValid: true, message: "Validation successful." };
};

export default checkValidateData;