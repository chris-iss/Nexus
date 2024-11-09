import { useState } from 'react';
import '../signup/SignUp.css';
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

const SignUp = () => {
  // State for form inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Input handlers
  const handleFirstnameInput = (e) => setFirstname(e.target.value);
  const handleLastnameInput = (e) => setLastname(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  // Validation functions
  const validateFirstname = () => firstname.length >= 3;
  const validateLastname = () => lastname.length >= 3;
  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = () => password.length >= 6;

  // Submit handler
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Input validation
    if (firstname === "") {
      newErrors.firstname = "Firstname is required";
    } else if (!validateFirstname()) {
      newErrors.firstname = "Firstname must be at least three characters long";
    }

    if (lastname === "") {
      newErrors.lastname = "Lastname is required";
    } else if (!validateLastname()) {
      newErrors.lastname = "Lastname must be at least three characters long";
    }

    if (email === "") {
      newErrors.email = 'Email is required';
    } else if (!validateEmail()) {
      newErrors.email = 'Invalid email format';
    }

    if (password === "") {
      newErrors.password = 'Password is required';
    } else if (!validatePassword()) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      // Clear the form if no errors
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setErrors({});
    }

    // API request to register
    try {
      const response = await axios.post("http://localhost:3001/register", {
        firstname, lastname, email, password
      });
      console.log("SignUp Successful", response);
    } catch (e) {
      console.log("Signup Error:", e);
    }
  }

  return (
    <div className='wrapper'>
      <div className='left-wrapper'>
        <div className='logos'>
          <img src='https://cdn.instituteofsustainabilitystudies.com/wp-content/uploads/2024/05/16110040/cropped-ISS-Favicon.png' width={80} className="bounce" alt="Logo" />
        </div>
        <div className='left-wrapper-text'>ISS Nexus</div>
      </div>
      <div className='right-wrapper'>
        <form className="right-form-wrapper" onSubmit={handleSignUpSubmit}>
          <div className="fname-input-wrapper">
            <label className="username-label">Firstname</label>
            <input type="text" value={firstname} onChange={handleFirstnameInput} className="right-form-username" name="firstname" />
            <span className="username-error">{errors.firstname}</span>
          </div>

          <div className="lname-input-wrapper">
            <label className="username-label">Lastname</label>
            <input type="text" value={lastname} onChange={handleLastnameInput} className="right-form-username" name="lastname" />
            <span className="username-error">{errors.lastname}</span>
          </div>

          <div className="login-input-wrapper">
            <label className="username-label">Email</label>
            <input type="text" value={email} onChange={handleEmailInput} className="right-form-username" name="email" />
            <span className="username-error">{errors.email}</span>
          </div>

          <div className="password-input-wrapper">
            <label className="password-label">Password</label>
            <input type="password" value={password} onChange={handlePasswordInput} className="right-form-username" name="password" />
            <p className="password-error">{errors.password}</p>
          </div>

          <div className="signup-form-actions">
            <button className="submit" type="submit">Sign Up</button>
          </div>

          <div className="signUp-wrapper">
            <a href="/" className="signUp-wrapper-link">
              <p>Login</p>
            </a>
            <FaLongArrowAltRight color='#8a8a8a' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
