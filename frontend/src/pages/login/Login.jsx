import React, { useState } from 'react';
import '../login/Login.css'
import { Link, useNavigate } from "react-router-dom"
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
 
    const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = () => password.toString().length >= 6;

    // Function to handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
       const newErrors = {};

       if(email === "") {
            newErrors.email = 'Email is required'
       } else if (!validateEmail()) {
            newErrors.email = 'Invalid email format';
       }

       if (password === "") {
            newErrors.password = 'Password is required'
       } else if (!validatePassword()) {
            newErrors.password = 'Password must be at least 6 characters long';
       }

       if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log("Errors:", newErrors); // Debugging statement
        } else {
          
            console.log('Logging in with:', { email: email, password: password });
          
            setEmail("");
            setPassword("");
            setErrors({});
        }

        ////// Submit Data to MongoDb ///////////////////////
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log(response)
        
            // Check if the response indicates success
            if (response.data.message === "Success") {
                localStorage.setItem('token', response || '');
                navigate("/dashboard");
            } else {
                // Handle other cases where login is not successful
                console.log('Login failed:', response.data.message || 'Unexpected response');
                alert(response.data.message || 'Login failed');
            }
        } catch (error) {
            if (error.response) {
                console.log("Server error response:", error.response.data);
                alert(error.response.data.message || "Login failed due to server error");
            } else {
                console.log("Network or other error:", error.message);
                alert("Network error. Please try again.");
            }
        }
        
        
    }
     
    return (
        <div className='wrapper'>
            <div className='left-wrapper'>
                <div className='logos'>
                        <img src='https://cdn.instituteofsustainabilitystudies.com/wp-content/uploads/2024/05/16110040/cropped-ISS-Favicon.png' width={80} className="bounce"/>
                </div>
                <div className='left-wrapper-text'>ISS Nexus</div>
            </div>
            <div className='right-wrapper'>
                    <form className='right-form-wrapper' onSubmit={handleLoginSubmit}>
                        <div className='signup-header'>Log In</div>
                        <div className='signup-text'>Not a member yet? &nbsp;<span className='sigup-text-span'><Link to="/register" className='sigup-text-span'>Sign Up</Link></span></div>
                        <div className='login-input-wrapper'>
                            <label className='username-label'>Email Address</label>
                            <input type='email' value={email} className='right-form-username' onChange={handleEmailInput} name="username" />
                            {errors.email && <span className='username-error'>{errors.email}</span>}
                        </div>

                        <div className='password-input-wrapper'>
                            <label className='password-label'>Password <span className='forgot'>Forget?</span></label>
                            <input type='text' value={password} className='right-form-username' onChange={handlePasswordInput} name="password" />
                            {errors.password && <p className='password-error'>{errors.password}</p>}
                        </div>

                        <div className='form-actions'>
                            <div className='remember-me'>
                                <input type='checkbox' className='checkbox' />
                                <p>Remember Me</p>
                            </div>
                            <button className='submit'>Log In</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default Login;