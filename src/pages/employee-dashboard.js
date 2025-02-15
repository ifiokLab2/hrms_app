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
import '../styles/organizations.css';
import Header from '../components/header';
import DesktopLogout from './desktop-logout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
//import hero1 from '../styles/hero1.jpg';

const EmployeeDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const [organizations,setOrganizations] = useState([]);
    const navigate = useNavigate();
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [loading,setLoading] = useState(true);
   
    

    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };


    
    const fetchEmployeeOrganizations = async () => {
        try {
            const response = await axios.get(`${apiUrl}/employee/organization/list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setOrganizations(response.data.all_organizations);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
        }
    };
    useEffect(() => {

       
        if (user=== null || user?.isEmployer === true ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        }
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
        
      
      
        fetchEmployeeOrganizations();
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
                        <div className='employer-organizations'>
                            <div class = 'org'>
                                Your organizations
                            </div>
                           <div></div>
                        </div>
                        <>
                            {loading ? (
                                 <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ) : (
                                <>
                                    {organizations.length > 0 ? (
                                    <div className='apps-container'>
                                    {organizations.map((data, index) => (
                                        <Link to={`/employee/organization/dashboard/${data.id}/${data.organization}/`} className='cards organization-card' key={index}>
                                        <div className='icon hrms-icon'>
                                            <img src={`${apiUrl}${data.logo}`} alt={data.name} />
                                        </div>
                                        <div className='text-wrapper'>
                                            <div className='title-header'>{data.organization}</div>
                                            <p>{data.overview}</p>
                                            <div className='employee-count'>
                                                <i class="fa-solid fa-users"></i>
                                                <span>({data.department})</span>
                                        
                                            </div>
                                            
                                            
                                        </div>
                                        <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                        {openModalIndex === index && (
                                            <div className='option-modal'>
                                            {/* Users should be able to click on edit tab to edit the specific organization */}
                                            <div className='option-card' >Request</div>
                                            <div className='option-card' >View</div>
                                        
                                            </div>
                                        )}
                                        </Link>
                                    ))}
                                    </div>
                                ) : (
                                    <h4>Loading...</h4>
                                )}
                                </>
                            )}
                        </>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default EmployeeDashboard;