import React, { useState } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import logo from '../images/logo192.png';
import logo2 from '../images/logo.png';
import apiUrl from '../components/api-url';
import '../styles/login.css';

const PasswordConfirm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { uuid,token } = useParams();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const navigate = useNavigate();



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        if (password !== ConfirmPassword ) {
            // Redirect to the login page
            setIsLoading(isLoading);
            setErrorMessage(`Password mismatch.`);
           
            return; // Stop further execution of useEffect
        }
        try {
            await axios.post(`${apiUrl}/password/reset/confirm/${uuid}/${token}/`, {password});
            setsnackbarStatus('success');
            setShowSnackbar(true);
            setTimeout(() => {
                setIsLoading(isLoading);
                navigate('/')
               
            }, 2000); 
            //setErrorMessage('Password reset sucessfull.');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
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
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                       
                        <div className={`form-group ${password ? 'active' : ''}`}>
                                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange = {handlePasswordChange} required />
                                <label htmlFor="password">Password</label>
                                <div className='eye-icon' onClick={togglePasswordVisibility}>
                                    <i class={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                                </div>
                            </div>
                            <div className={`form-group ${ConfirmPassword ? 'active' : ''}`}>
                                <input  type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={ConfirmPassword} onChange = {handleConfirmPasswordChange} required />
                                <label htmlFor="password">Confirm Password</label>
                                <div className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                                    <i class={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                                </div>
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

export default PasswordConfirm;
