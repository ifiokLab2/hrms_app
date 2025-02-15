import React, { useState } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import logo from '../images/logo192.png';
import logo2 from '../images/logo.png';
import apiUrl from '../components/api-url';
import '../styles/login.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
       
        try {
            await axios.post(`${apiUrl}/password/reset/`, { email });
            setsnackbarStatus('success');
            setShowSnackbar(true);
            setErrorMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            setErrorMessage('User does not exist.');
        }
        setIsLoading(isLoading);
    };

    return (
        <div className='page-wrapper'>
        <div className='login-wrapper'>
           <div className='container2'>
                <div className='container2-wrapper'>
                    <form id='form-container-password' className="form-container" onSubmit={handleSubmit}>
                        <div className='form-logo'>
                            <span>HRMS</span> 
                            <img className='auth-logo' src={logo2} alt = 'logo2' />
                        </div>
                        <div className='form-header'>
                           
                            <span style={{fontSize:'.9rem'}}>Forgot Password</span>
                            
                        </div>
                        {errorMessage && <div className="error-messae">{errorMessage}</div>}
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="text" id="email" value={email} onChange = {(event)=>setEmail(event.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                      
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Reset Password
                                {isLoading ? <div className="loader"></div> : '' }
                                
                            </button>
                        </div>
                        <div className='link-btn-wrapper'>
                            <Link style={{color:'blue',fontSize:'.9rem',fontWeight:'700'}} to='/'>Login</Link>
                           
                        </div>
                        
                    </form>
                </div>
           </div>
        </div>
        {showSnackbar && (
                <div className={` ${snackbarStatus==='success' ? 'snackbar-success' :'snackbar-danger'} `}>
                    {snackbarStatus === 'success' ? (
                        <>
                            <i class="fa-solid fa-circle-check"></i>
                            success!
                        </>
                    ):
                    (
                        <>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            fail!
                        </>
                    )
                }
                    
                </div>
            )}
    </div>
    );
};

export default ForgotPassword;
