import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/create-course.css';
import '../styles/instructor.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
import DesktopLogout from './desktop-logout';
//import hero1 from '../styles/hero1.jpg';

const EmployeeProfile = ()=>{
    const user = useSelector((state) => state.user.user);
    const  [profile,setProfile] = useState({});
    const navigate = useNavigate();
   

  
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/employee/profile/fetch/`,{
                    headers: {
                        Authorization: `Token ${user?.auth_token}`,
                    },
                });
                if(response.data.success){
                    setProfile(response.data.data)
                 }else{
                    //navigate('/profile/create/');
                };
            
            } catch (error) {
                //navigate('/access-denied/');
             
            }   
        };

      fetchProfile();
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
                        <Link to='/employee/dashboard/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organizations</span>
                        </Link>
                        <Link to='/employee/courses' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        
                       
                        <Link to={`#`} className = 'card'>
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
                        <div className='author-container'>
                             <div className='profile-container'>
                                <div className='caption'>Your Profile</div>
                                <img src={`${apiUrl}${profile.picture}`} alt = 'instructor' />
                                <div className='author-details'>
                                    <div className='name'>
                                        {user.first_name} {user.last_name}
                                        <Link className='profile-edit' to='/employee/profile/edit/'>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </div>
                                    <div className='title'>
                                    {profile.title}
                                    </div>
                                    <div className='phone'>
                                        <i class="fa-solid fa-phone"></i>
                                    {profile.phone}
                                    </div>
                                    <div className='website'>
                                        <i class="fa-solid fa-globe"></i>
                                        {profile.address}
                                    </div>
                                
                                    <div className='description'>
                                    
                                    <ReactQuill
                                    value={profile.biography}
                                        readOnly={true}
                                        theme={"bubble"}
                                    />


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;