import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
import apiUrl from '../components/api-url';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import DesktopLogout from './desktop-logout';
//import hero1 from '../styles/hero1.jpg';

const EmployeeCourses = ()=>{
    const user = useSelector((state) => state.user.user);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeProfile,setEmployeeProfile] = useState({});


    useEffect(() => {
        const fetchCourses = async () => {
            console.log('user.auth_token:',user);
          try {
            const response = await axios.get(`${apiUrl}/enrolled-courses/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
            setCourses(response.data.all_courses);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
          }
        };
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/employee/profile/fetch/`,{
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
    
        fetchCourses();
        fetchProfileData();
    }, [user]);
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
                       
                        
                        <Link to={`${employeeProfile.exist ? '/employee/profile/' : '/employee/profile/create'}`} className = 'card'>
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
                        <div className='course-wrapper'>
                            <div className='popular'>
                                <h2>My Learning</h2>
                                <div className='time-text'>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals.</div>
                            </div>
                            <div className='course-container'>
                                {loading ? (
                                    <>
                                        <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                    </>
                                ):(
                                    <>
                                        {courses.length === 0 ? (
                                            <h5>No courses have been assigned yet. Please check back later or contact your administrator.</h5>
                                        ):(
                                            <>
                                                {courses.map((course) => (
                                                    <Link to={`/course-view-page/${course.id}/${course.title}/`}  className='card'>
                                                        <img src = {`${course.thumbnail}`} alt='' />
                                                        <div className='card-details'>
                                                            <h2>{course.title}</h2>
                                                            <div className='author-name'>{course.instructor}r</div>
                                                            
                                                        </div>
                                                    </Link>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                                
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCourses;