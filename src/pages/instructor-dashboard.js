import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const InstructorDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [loading, setLoading] = useState(true);
    const [employeeProfile,setEmployeeProfile] = useState({});
    
    const navigate = useNavigate();
    useEffect(() => {


        const fetchUserCourses = async () => {
            console.log('loaing..',loading);
            try {
                const response = await axios.get(`${apiUrl}/instructor-courses/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                    },
                });
                setLoading(false);
                console.log('loaing..',loading);
                setCourses(response.data.all_courses);
                
            } catch (error) {
                console.error('Error fetching user courses:', error);
                setLoading(false);
            }
        };
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/instructor/profile/fetch/`,{
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

        fetchUserCourses();
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
                        <Link to='/instructor/dashboard/' className = 'card'>
                            <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                       
                        
                       
                        <Link to={`${employeeProfile.exist ? '/instructor/profile/' : '/instructor/profile/create'}`} className = 'card'>
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
                        <div className='course-header'>
                            <div className='title' >Courses</div>
                        <Link to = '/instructor/courses/create/' className='create-course'>Create Course</Link>
                        </div>
                        { loading  ? (
                           <p>Loading...</p>
                        ):(
                            <>
                                {courses.length > 0 ? (
                                    courses.map(course => (
                                    <div key={course.id} className='course-box'>
                                    <img src={`${apiUrl}${course.thumbnail}`} alt={course.title} />
                                    <div className='details-card'>
                                        <div className='box-1'>
                                        <div className='title'>{course.title}</div>
                                        <Link to={`/course-sections/${course.id}/${course.title}/`} className='edit'>
                                            Edit / Manage course
                                        </Link>
                                        </div>
                                        <div>
                                        <Link to={`/courses/add-requirement/${course.id}/${course.title}/`} className='requirements'>
                                            Add requirements
                                        </Link>
                                        </div>
                                        <div className='status'>
                                        <Link to={`/courses/add-objectives/${course.id}/${course.title}/`} className='objectives'>
                                            Add objectives
                                        </Link>
                                        <Link to={`/course/${course.id}/edit/`} className='edit-course'>
                                            edit-course
                                        </Link>
                                        <span>Status:</span>
                                        <span>Draft</span>
                                        </div>
                                    </div>
                                    </div>
                                    ))
                                ) : (
                                <p>You haven't created any courses yet.</p>
                                )}
                            </>
                        )}

                
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;