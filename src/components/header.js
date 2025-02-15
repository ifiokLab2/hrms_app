import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import apiUrl from '../components/api-url';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/header.css';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import { useSelector } from 'react-redux';
//import hero1 from '../styles/hero1.jpg';

const Header = ()=>{
    const [sidebarOpen,setSideBarOpen] = useState(false);
    const [profile,setProfile] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const auth = useSelector(state => state.user);
    const toggleSideBar = ()=>{
        setSideBarOpen(!sidebarOpen);
    };
    useEffect(() => {
        if (auth.user === null ) {
            // Redirect to the login page
            navigate('/');
            return ;
        }
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/profile/fetch/`,{
                    headers: {
                        Authorization: `Token ${user?.auth_token}`,
                    },
                });
                if(response.data.success){
                    setProfile(response.data.data)
                 }else{
                    setProfile(response.data.data)
                };
            
            } catch (error) {
                //navigate('/access-denied/');
             
            }   
        };

      fetchProfile();
    }, [user,navigate]);
    const handleLogout = async () => {
        dispatch(setUser(null));
        navigate('/logout');
    };
    return(
        <div className ='header-wrapper'>
            <div className = 'logo' >
               <span className = 'menu-btn' onClick={toggleSideBar}>
                <i class="fa-solid fa-bars"></i>
               </span>
                HRMS App
            </div>
            <div className='aside-wrapper'>
                <Link className='help'>
                    <i className="fa-solid fa-circle-question"></i>
                </Link>
                <div className='profile-card'>
                    {profile.exist ? (
                        <img src={logo} alt='profile' />
                    )
                : (
                    <i class="fa-solid fa-user"></i>
                )}
                    
                </div>
            </div>
            <div className={`header-sidebar ${sidebarOpen ? 'show' : ''}` }>
                <div className='close-icon' onClick={toggleSideBar}>
                     <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div className='sidebar-container-1'>
                        {user?.isEmployer && (
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
                            <Link to={`${profile.exist ? '/employer/profile/' : '/employer/profile/create'}`} className = 'card'>
                                <i className="fa-solid fa-gear"></i>
                                <span className = 'title'>Settings </span>
                            </Link>
                            <Link className = 'card'>
                                <i class="fa-solid fa-headset"></i>
                                <span className = 'title'>Support</span>
                            </Link>
                        </div>
                        )}
                         {user?.isEmployee && (
                             <div className='sidebar-container-1'>
                             <div className = 'box1-wrapper'>
                                 <div className = 'card organization' >
                                     <i class="fa-solid fa-building"></i>
                                     <span className = 'title'>{user.first_name} {user.last_name}</span>
                                 </div>
                                 <Link to='/employee/dashboard/' className = 'card'>
                                     <i class="fa-solid fa-users"></i>
                                     <span className = 'title'>Organizations</span>
                                 </Link>
                                 <Link to='/employee/courses' className = 'card'>
                                      <i class="fa-solid fa-chalkboard"></i>
                                     <span className = 'title'>Your Courses</span>
                                 </Link>
                                
                                 
                                 <Link to={`${profile.exist ? '/employee/profile/' : '/employee/profile/create'}`} className = 'card'>
                                     <i className="fa-solid fa-gear"></i>
                                     <span className = 'title'>Settings </span>
                                 </Link>
                                 <Link className = 'card'>
                                     <i class="fa-solid fa-headset"></i>
                                     <span className = 'title'>Support</span>
                                 </Link>
                             </div>
                             
                         </div>
                        )}
                         {user?.isInstructor && (
                             <div className='sidebar-container-1'>
                             <div className = 'box1-wrapper'>
                                 <div className = 'card organization' >
                                     <i class="fa-solid fa-building"></i>
                                     <span className = 'title'>{user.first_name} {user.last_name}</span>
                                 </div>
                                 <Link to='/instructor/dashboard/' className = 'card'>
                                     <i class="fa-solid fa-chalkboard"></i>
                                     <span className = 'title'>Your Courses</span>
                                 </Link>
                                
                                 
                                
                                 <Link to={`${profile.exist ? '/instructor/profile/' : '/instructor/profile/create'}`} className = 'card'>
                                     <i className="fa-solid fa-gear"></i>
                                     <span className = 'title'>Settings </span>
                                 </Link>
                                 <Link className = 'card'>
                                     <i class="fa-solid fa-headset"></i>
                                     <span className = 'title'>Support</span>
                                 </Link>
                             </div>
                             
                         </div>
                        )}
                         {user?.isClient && (
                             <div className='sidebar-container-1'>
                             <div className = 'box1-wrapper'>
                                 <div className = 'card organization' >
                                     <i class="fa-solid fa-building"></i>
                                     <span className = 'title'>{user.first_name} {user.last_name}</span>
                                 </div>
                                 <Link to='/client/dashboard/' className = 'card'>
                                     <i class="fa-solid fa-chalkboard"></i>
                                     <span className = 'title'>Organizations & Partnership</span>
                                 </Link>
                                
                                 
                                
                                 <Link to={`${profile.exist ? '/instructor/profile/' : '/instructor/profile/create'}`} className = 'card'>
                                     <i className="fa-solid fa-gear"></i>
                                     <span className = 'title'>Settings </span>
                                 </Link>
                                 <Link className = 'card'>
                                     <i class="fa-solid fa-headset"></i>
                                     <span className = 'title'>Support</span>
                                 </Link>
                             </div>
                             
                         </div>
                        )}

                        <div className = 'box2-wrapper' >
                            <div onClick={handleLogout} className = 'card'>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span className = 'title'>Logout</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Header;