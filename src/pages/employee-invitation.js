import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link, useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import DesktopLogout from './desktop-logout';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/instructor.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const EmployeeInvite = ()=>{
    const user = useSelector((state) => state.user.user);
    const auth = useSelector((state) => state.user);
    const { invitation_code } = useParams();
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [invitation,setInvitation] = useState('');
    const location = useLocation(); // Get current location
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAcceptInvitation = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setErrorMessage('');
        
        try {
            const formData = new FormData();
            formData.append('invitation_code', invitation_code);
            
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/employee-invite/accept/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/employee/dashboard/');
                    //navigate('/instructor/profile/');
                   
                }, 2000);
              
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage("You've already joined this organization")
                setIsLoading(isLoading);
               // console.error('profile creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
           
            setTimeout(() => {
                setIsLoading(isLoading);
                
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    

    useEffect(() => {
        
        if (auth.user === null || user.isEmployee === false ) {
            // Redirect to the login page
            navigate(`/?nextpage=${location.pathname}`);

            return ;
        }

        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/client/profile/fetch/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
              });
              
                if (response.data.success) {
                    setEmployeeProfile(response.data.data);
                    
                    //setPreviousPicture Redirect to the home page
                   
                }else{
                    console.log('else:',response.data.data);
                    setEmployeeProfile(response.data.data);
                }
                
              
            } catch (error) {
                setTimeout(() => {
                    //navigate('/instructor/login/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
              console.error('Errors:', error);
            }
        };
        const fetchInvitation = async () => {
            try {
              const response = await axios.get(`${apiUrl}/fetch/employee-invitation/${invitation_code}/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
              });
              
                if (response.data.success) {
                    setInvitation(response.data.data);
                    
                    
                    //setPreviousPicture Redirect to the home page
                   
                }else{
                    navigate('/expired/');
                    console.log('else:',response.data.data);
                   
                }
                
              
            } catch (error) {
                setTimeout(() => {
                    //navigate('/instructor/login/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
              console.error('Errors:', error);
            }
        };
        fetchProfileData();
        fetchInvitation();
    }, [user]);


    return(
        <div className ='page-wrapper'>
            <Header/>
            <div className = 'wrapper' >
                <div className='sidebar-container-1'>
                    <div className = 'box1-wrapper'>
                        <div className = 'card organization' >
                            <i class="fa-solid fa-building"></i>
                            <span className = 'title'>{user?.first_name} {user?.last_name}</span>
                        </div>
                        <Link to='/client/dashboard/' className = 'card'>
                            <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Organizations & Partnerships</span>
                        </Link>
                        
                       
                        <Link to={`${employeeProfile.exist ? '/client/profile/' : '/client/profile/create'}`} className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings </span>
                        </Link>
                        <Link className = 'card'>
                            <i class="fa-solid fa-headset"></i>
                            <span className = 'title'>Support</span>
                        </Link>
                    </div>
                    <div className = 'box2-wrapper' >
                       <DesktopLogout />
                    </div>
                </div>
                <div className='container-2'>
                    <div className = "container-2-wrapper">
                        <div className='wrappe'>
                            {/* Provide a sample message to display to the client to join the organization */}
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <p>Please accept the invitation to join the organization:{invitation?.organization}</p>
                            <div className='btn-wrapper-invite'>
                                <button onClick={handleAcceptInvitation} >
                                    Submit
                                    {isLoading ? <div className="loader"></div> : '' }
                                        
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeInvite;