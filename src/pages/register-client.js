import React, { useState } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/login.css';
import logo2 from '../images/logo.png';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
import { useDispatch} from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions



//import hero1 from '../styles/hero1.jpg';

const  ClientViaLink = ()=>{
    const dispatch = useDispatch();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { invitation_code } = useParams();

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(!isLoading);
        if (password !== ConfirmPassword ) {
            // Redirect to the login page
            setIsLoading(isLoading);
            setErrorMessage(`Password mismatch.`);
           
            return; // Stop further execution of useEffect
        }

        try {
           
            const response = await axios.post(`${apiUrl}/client-register-via-link/${invitation_code}/`, {
                first_name: fname,
                last_name: lname,
                email,
                password,
                ConfirmPassword,
            });

            if (response.data.success) {
                console.log('response.data.data:',response.data.data);
                dispatch(setUser(response.data.data));

                // Redirect to the home page
                setTimeout(() => {
                    console.log('hello,',invitation_code);
                    
                    navigate(`/client/${invitation_code}/`); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            } else {
                console.error('Signup failed:',response.data.errors);
               
            
            // Handle failed signup, e.g., show error messages to the user
            }
        } catch (error) {
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage(`Incorrect email or password.`);
               
            }, 2000); // 2000 milliseconds (2 seconds) delay
           
            // Handle unexpected errors
        }
        finally {
            setIsLoading(isLoading);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
   
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const slides = [
        hero1,
        logo,
     ];
    return(
        <div className='page-wrapper'>
            <div className='login-wrapper'>
               <div className='container1'>
                <div className='container-wrapper' >
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    modules={[Autoplay, Pagination, Navigation]}
                    >
                    <SwiperSlide  >
                        <div className='hero-container'>
                            <img src={hero1}  alt={`Slide1`}/>
                            <div className='hero-text'>
                                <h1>Best Employee Experience Platform</h1>
                                <p>Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. You achieve what you believe.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >
                        <div className='hero-container'>
                            <img src={hero2}  alt={`Slide2`}/>
                            <div className='hero-text'>
                                <h1>Finally a place where it all comes together</h1>
                                <p>Employees like you can even make Mondays a joy. Thanks for your hard work and super attitude.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >
                        <div className='hero-container'>
                            <img src={hero3}  alt={`Slide2`}/>
                            <div className='hero-text'>
                                <h1>Focus on the work that matters</h1>
                                <p>Business opportunities are like buses, there’s always another one coming.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                </div>
               
                   
               </div>
               <div className='container2'>
                    <div className='container2-wrapper'>
                        <form className="form-container" onSubmit={handleSubmit}>
                            <div className='form-logo'>
                                <span>HRMS</span> 
                                <img className='auth-logo' src={logo2} alt = 'logo2' />
                            </div>
                            <div className='form-header'>
                               
                                <span>Client Signup</span>
                                
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <div className={`form-group ${fname ? 'active' : ''}`}>
                                <input type="text" id="fname" value={fname} onChange = {handleFnameChange} required />
                                <label htmlFor="fname">First name</label>
                            </div>
                            <div className={`form-group ${lname ? 'active' : ''}`}>
                                <input type="text" id="lname" value={lname} onChange = {handleLnameChange} required />
                                <label htmlFor="lname">last name</label>
                            </div>
                            <div className={`form-group ${email ? 'active' : ''}`}>
                                <input type="text" id="email" value={email} onChange = {handleEmailChange} required />
                                <label htmlFor="email">Email</label>
                            </div>
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
                                    signup
                                    {isLoading ? <div className="loader"></div> : '' }
                                    
                                </button>
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        </div>
    );
};

export default  ClientViaLink;