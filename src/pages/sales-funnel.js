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

const SalesFunnel = ()=>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { Id } = useParams();
    const user = useSelector(state => state.user.user);

    

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
                        <div className='employer-organizations'>
                            <div class = 'org'>
                                Sales Funnel
                            </div>
                            <div className='create-btn'>create</div>
                        </div>
                        <div className='apps-container'>
                            <Link to={`/organization/${Id}/leads/`} className='cards organization-card'>
                                <div className='icon hrms-icon'>
                                    <i className="fa-solid fa-binoculars"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Leads</div>
                                    <p>CRM</p>
                                    <div className='employee-count'>
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                    
                                </div>
                                    
                            </Link>
                            <Link to={`/organization/${Id}/contacts/`} className='cards organization-card'>
                                <div className='icon hrms-icon'>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Contacts</div>
                                    <p>CRM</p>
                                    <div className='employee-count'>
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                   
                                </div>
                                    
                            </Link>
                            <Link to={`/organization/${Id}/deals/`} className='cards organization-card'>
                                <div className='icon hrms-icon'>
                                <i class="fa-solid fa-universal-access"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Deals</div>
                                    <p>CRM</p>
                                    <div className='employee-count'>
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                   
                                </div>
                                    
                            </Link>
                            <Link to={`/organization/${Id}/activity/`} className='cards organization-card'>
                                <div className='icon hrms-icon'>
                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Activities</div>
                                    <p>CRM</p>
                                    <div className='employee-count'>
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                   
                                </div>
                                    
                            </Link>
                            <Link to={`/organization/dashboard/`} className='cards organization-card'>
                                <div className='icon hrms-icon'>
                                <i class="fa-solid fa-book"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Notes</div>
                                    <p>CRM</p>
                                    <div className='employee-count'>
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' >
                                   
                                </div>
                                    
                            </Link>
                           
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesFunnel;