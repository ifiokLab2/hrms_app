import React, { useState,useEffect } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/login.css';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import logo2 from '../images/logo.png';
import apiUrl from '../components/api-url';
import { useDispatch} from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
//import hero1 from '../styles/hero1.jpg';

const  AdminLogin = ()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nextPage, setNextPage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    //const { nextpage } = new URLSearchParams(location.search);
    //const { nextpage } = new URLSearchParams(location.search).get('nextpage');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    useEffect(() => {
        const nextpage = new URLSearchParams(location.search).get('nextpage');
        setNextPage(nextpage); 
       
    }, [location.search]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);

        try {
           
            const response = await axios.post(`${apiUrl}/login/`, {
            email,
            password,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));

                // Redirect to the home page
                setTimeout(() => {
                    if(response.data.user.isEmployer){
                        navigate('/employer-dashboard/');
                    }
                    if(response.data.user.isEmployee){
                       
                        if(nextPage){
                            
                            navigate(`${nextPage}`);
                            //navigate('/client/dashboard/');
                            //<Navigate to={nextPage} />
                        }else{
                            navigate('/employee/dashboard/');
                        }
                    }
                    if(response.data.user.isInstructor){
                        navigate('/instructor/dashboard/');
                    }
                    if(response.data.user.isClient){
                        if(nextPage){
                            
                            navigate(`${nextPage}`);
                            //navigate('/client/dashboard/');
                            //<Navigate to={nextPage} />
                        }else{
                            navigate('/client/dashboard/');
                        }
                        
                    }
                   
                   
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

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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
                               
                                <span>Login</span>
                                
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                            <div className='forgot-btn-wrapper'>
                                <Link to='/forgot-password/'>Forgot password?</Link>
                               
                            </div>
                            

                            <div className='btn-wrapper'>
                                <button type="submit">
                                    Login
                                    {isLoading ? <div className="loader"></div> : '' }
                                    
                                </button>
                            </div>
                            <div className='link-btn-wrapper'>
                                <Link to='/organization/signup/'>Signup as an organization</Link>
                               
                            </div>
                            <div className='link-btn-wrapper'>
                                <Link to='/client/signup/'>Signup as a client</Link>
                               
                            </div>
                            <div className='link-btn-wrapper'>
                                
                                <Link to='/instructor/signup/'>Signup as an Instructor</Link>
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        </div>
    );
};

export default AdminLogin;