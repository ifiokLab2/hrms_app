import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import DesktopLogout from './desktop-logout';

//import hero1 from '../styles/hero1.jpg';

const EmployerDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const navigate = useNavigate();
    useEffect(() => {

       
        if (user=== null || user?.isEmployee === true ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        }
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/employer/profile/fetch/`,{
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
        
      
      
       
        fetchProfileData();
    }, [user,navigate]);
    return(
        <div className ='page-wrapper'>
            <Header/>
            <div className = 'wrapper' >
                <div className='sidebar-container-1'>
                    <div className = 'box1-wrapper'>
                        <div className = 'card organization' >
                            <i class="fa-solid fa-building"></i>
                            <span className = 'title'>{user.first_name} {user.last_name}</span>
                        </div>
                        <Link to='/employer-dashboard/' className = 'card'>
                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <span className = 'title'>Apps</span>
                        </Link>
                        <Link to='/organizations/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organization & users</span>
                        </Link>
                        <Link to='/organization/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        <Link to={`${employeeProfile.exist ? '/employer/profile/' : '/employer/profile/create'}`} className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings </span>
                        </Link>
                        <Link className = 'card'>
                            <i class="fa-solid fa-headset"></i>
                            <span className = 'title'>Support</span>
                        </Link>
                    </div>
                    <div className = 'box2-wrapper' >
                        <DesktopLogout/>
                    </div>
                </div>
                <div className='container-2'>
                    <div className = "container-2-wrapper">
                        <div className='title'>All Apps</div>
                        <div className='apps-container'>
                            <Link to='/organizations/' className='cards'>
                                <div className='icon hrms-icon'>
                                    <i class="fa-solid fa-user-tie"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>HRMS</div>
                                    <p>Human Resource management System</p>
                                </div>
                            </Link>
                            <Link to='/elearning/' className='cards'>
                                <div className='icon e-icon'>
                                <i class="fa-solid fa-graduation-cap"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Elearning</div>
                                    <p>Upskill your team with top in demand courses</p>
                                </div>
                            </Link>
                           
                            
                            <Link to='/organizations/' className='cards'>
                                 <div className='icon time-icon'>
                                 <i class="fa-solid fa-business-time"></i>
                                 </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>TimeSheet</div>
                                    <p>Seamless payment & invoice system</p>
                                </div>
                            </Link>
                            <Link to='/organization/courses/' className='cards'>
                                <div className='icon p-icon'>
                                    <i class="fa-solid fa-chalkboard"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Your Courses</div>
                                    <p>A world of learning </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default EmployerDashboard;