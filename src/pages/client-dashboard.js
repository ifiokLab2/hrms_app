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

const ClientDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const auth = useSelector(state => state.user);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [organizations,setOrganizations] = useState([]);
    const [loadOrg,setLoadOrg] = useState(false);
    //const [loading, setLoading] = useState(true);
    const [employeeProfile,setEmployeeProfile] = useState({});
    
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user === null ) {
            // Redirect to the login page
            navigate('/');
            return ;
        }
        const fetchOrganizations = async () => {
            setLoadOrg(true);
            try {
                const response = await axios.get(`${apiUrl}/client-organizations/list/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                    },
                });
                //console.log(response.data.all_courses)
                setOrganizations(response.data.all_organizations);
                setLoadOrg(false);
                //setLoading(false);
            } catch (error) {
                console.error('Error fetching user courses:', error);
                //setLoading(false);
            }
        };
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
        fetchProfileData();
        fetchOrganizations();
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
                        <Link to='/' className = 'card'>
                            <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Recents Invites</span>
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
                    <div className = "container-2-wrapper">
                        <div className='employer-organizations'>
                            <div class = 'org'>
                                Your Partnerships
                            </div>
                            <div className='creat-btn' ></div>
                        </div>
                        {loadOrg ? (
                           <h4>Loading....</h4>
                        ):
                        (
                            <>
                             {organizations.length > 0 ? (
                            <div className='apps-container'>
                            {organizations.map((data, index) => (
                                <Link to={`/client/organization/${data.id}/${data.name}/`} className='cards organization-card' key={index}>
                                <div className='icon hrms-icon'>
                                    <img src={`${apiUrl}${data.logo}`} alt={data.name} />
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>{data.name}</div>
                                    <p>{data.overview}</p>
                                    <div className='employee-count'>
                                        
                                   
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                  
                                </div>
                                
                                </Link>
                            ))}
                            </div>
                        ) : (
                            <h4>You don't have  any partnership yet.</h4>
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

export default ClientDashboard;