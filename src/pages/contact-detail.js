import React, { useState,useEffect } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import "react-quill/dist/quill.snow.css";
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/create-course.css';
import '../styles/instructor.css';
import Header from '../components/header';
import DesktopLogout from './desktop-logout';

import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const ContactDetail = ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState('');
    const { Id } = useParams();
    const user = useSelector(state => state.user.user);

    const fetchContact = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/contact/${Id}/detail/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.leads);
          setContact(response.data.all_contact);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setContact([]);
          console.error('Error fetching employees:', error.message);
        }
    };  
  
    useEffect(() => {
           

        fetchContact();
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
                        <Link to={`/organization/${Id}/sales-funnel/`} className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Sales Funnel</span>
                        </Link>
                        <Link to='/organization/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        <Link to="" className = 'card'>
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
                                <div className='caption'>Contact Detail</div>
                                {loading ? (
                                    <p>Loading...</p>
                                ):(
                                    <>
                                    <div className='lead-name initials-cap-x'>{contact.initials}</div>
                                    <div className='author-details'>
                                        <div className='name'>
                                            {contact.title}
                                            <Link className='profile-edit' to=''>
                                               
                                            </Link>
                                        </div>
                                        <div className='title'>
                                           
                                        </div>
                                        <div className='phone'>
                                            Type:  {contact.type}
                                         
                                        </div>
                                        <div className='website'>
                                            comments:  {contact.comments}
                                           
                                        </div>
                                        <div className='website'>
                                            Phone:  {contact.phone}
                                           
                                        </div>
                                        
                                    
                                        
                                    </div></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;