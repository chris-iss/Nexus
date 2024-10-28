import React from 'react';
import '../login/Login.css'

const Login = () => {
    return (
        <div className='wrapper'>
            <div className='left-wrapper'>
                <div className='left-wrapper-text'>ISS Nexus</div>
            </div>
            <div className='right-wrapper'>
                    <form className='right-form-wrapper'>
                        <label className='username-label'>Username or Email Address</label>
                        <input type='text' className='right-form-username' />
                        <label className='password-label'>Password</label>
                        <input type='text' className='right-form-username' />

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