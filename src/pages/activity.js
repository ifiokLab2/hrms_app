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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const  Activity = ()=>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { Id } = useParams();
    const user = useSelector(state => state.user.user);
    const [modal,setModal] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [Loading,setLoading] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);

    const [contact, setContact] = useState([]);
    const [deals, setDeals] = useState([]);
    
    const [dealsList, setDealsList] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [activityType, setActivityType] = useState('NOTE');
    const [activities, setActivities] = useState([]);
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [stage, setStage] = useState('OPEN');


    const toggleModal = ()=>{
        setModal(!modal);
    };
    const handleContactChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selected.push(options[i].value);
          }
        }
        setContact(selected);
      };
    const toggleEditModal = (event,id,activity_type,description,end_time,stage)=>{
        event.preventDefault();
        setEditModal(!editModal);
        setErrorMessage("");
        setActivityId(id);
        setActivityType(activity_type);
        setDescription(description);
        setEndTime(end_time);
        setStage(stage);

       
    };
    const handleDealsChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selected.push(options[i].value);
          }
        }
        setDealsList(selected);
      };
   
    const closeEditModal = ()=>{
        setEditModal(false);
        setErrorMessage("");
        setActivityId('');
        setActivityType('');
        setDescription('');
        setEndTime('');
        setStage('');
    };
    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    const handleActivityCreate = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('contact', contact);
             formData.append('deals', dealsList);
            formData.append('activity_type', activityType);
            formData.append('description',description);
            formData.append('start_time',startTime);
            formData.append('end_time',endTime );
            formData.append('stage',stage);
            //formData.append('date',date);
            const response = await axios.post(`${apiUrl}/activities/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setsnackbarStatus('success');
                setShowSnackbar(true);
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setShowSnackbar(false);
                    setContact('');
                    setActivityType('');
                    setDescription('');
                    setStartTime('');
                    setStage('');
                    setModal(false);
                    fetchActivities();
             
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setShowSnackbar(false);
             
                    //navigate('/');
                   
                }, 2000);
                setErrorMessage(response.data.message);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('An error occurred');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleEditActivities = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('activity_type', activityType);
            formData.append('description',description);
            formData.append('start_time',startTime);
            formData.append('end_time',endTime );
            formData.append('stage',stage);
            //formData.append('date',date);
            const response = await axios.put(`${apiUrl}/activities/${activityId}/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setsnackbarStatus('success');
                setShowSnackbar(true);
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setShowSnackbar(false);
                    setContact('');
                   
                    setEditModal(false);
                    fetchActivities();
                   // fetchLeads();
             
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setShowSnackbar(false);
             
                    //navigate('/');
                   
                }, 2000);
                setErrorMessage(response.data.message);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('An error occurred');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleDealDelete = async (event,id) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
           
            const response = await axios.delete(`${apiUrl}/activities/${id}/delete/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setsnackbarStatus('success');
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false);
                    setIsLoading(isLoading);
                    fetchActivities();
                    setOpenModalIndex(null);
                }, 2000);
                
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false);
                    //navigate('/');
                   
                }, 2000);
                setErrorMessage(response.data.message);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setErrorMessage('An error occurred');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    
   
    
    const fetchContacts = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/contacts/${Id}/contact-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.all_contacts);
          setContacts(response.data.all_contacts);
          //setLoading(false);
        } catch (error) {
          //setLoading(false);
          setContacts([]);
          console.error('Error fetching employees:', error.message);
        }
    }; 
    const fetchDeals = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/deals/${Id}/deals-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.all_contacts);
          setDeals(response.data.all_deals);
          //setLoading(false);
        } catch (error) {
          //setLoading(false);
          setDeals([]);
          console.error('Error fetching employees:', error.message);
        }
    };  
    
    const fetchActivities = async () => {
        try {
            setIsLoading(!isLoading);
            const response = await axios.get(`${apiUrl}/activities/${Id}/activities-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.all_contacts);
          setActivities(response.data.all_activities);
          setIsLoading(isLoading);
          //setLoading(false);
        } catch (error) {
          //setLoading(false);
          setActivities([]);
          console.error('Error fetching employees:', error.message);
        }
    }; 
  
    useEffect(() => {
           
        fetchContacts();
        fetchDeals();
        fetchActivities();
      
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
                        <div className='employer-organizations'>
                            <div class = 'org'>
                                Activity
                            </div>
                            <div className='create-btn' onClick={toggleModal}>create</div>
                        </div>
                        <div className='apps-container'>
                            {isLoading ? (
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ) : (
                                <>
                                    {activities.length === 0 ? (
                                        <p>No data available.</p>
                                    ) : (
                                        <>
                                            {activities.map((data,index) => (
                                                <Link key={data.id} to={`/organization/${data.id}/activity-detail/`} className='cards organization-card'>
                                                <div className='icon hrms-icon initials-cap'>
                                                    {data.initials}
                                                </div>
                                                <div className='text-wrapper'>
                                                    <div className='title-header'>{data.activity_type}</div>
                                                    <p>{data.stage} </p>
                                                    <div className='employee-count'>
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                                <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </div>
                                                {openModalIndex === index && (
                                                    <div className='option-modal'>
                                                    {/* Users should be able to click on edit tab to edit the specific organization */}
                                                    <div className='option-card' onClick={(event) => toggleEditModal(event,data.id,data.activity_type, data.description,data.end_time, data.stage)}>Edit</div>
                                                    <div className='option-card' onClick={(event) => handleDealDelete(event,data.id)} >Delete</div>
                                                
                                                    </div>
                                                )}
                                            
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
            <form className={`organization-form ${modal ? 'show' : ''}`} onSubmit = {handleActivityCreate} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create Activity</div>
                        <div className='icon' onClick={toggleModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${description ? 'active' : ''}`}>
                            <textarea id="description" value={description} onChange = {(e)=>setDescription(e.target.value)} required />
                            <label htmlFor="description">Description</label>
                        </div>
                       
                        
                       
                        <div className={`form-group ${stage ? 'active' : ''}`}>
                          
                            <select value={stage} onChange={(e) => setStage(e.target.value)} required>
                                <option value="">Status</option>
                                <option value="NEW">New</option>
                                <option value="QUALIFICATION">Qualification</option>
                                <option value="DISCOVERY">Discovery</option>
                                <option value="PROPOSAL">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="CLOSED WON">Closed Won</option>
                                <option value="CLOSED LOST">Closed Lost</option>
                               
                            </select>
                        </div>
                        <div className={`form-group ${activityType ? 'active' : ''}`}>
                          
                            <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
                                <option value=''>Activity</option>
                                <option value='NOTE'>Note</option>
                                <option value='CALL'>Call</option>
                                <option value='MEETING'>Meeting</option>
                                <option value='EMAIL'>Email</option>
                            </select>
                        </div>
                        <div className={`form-group ${deals ? 'active' : ''}`}>
                          
                            <select value={dealsList} onChange={handleDealsChange}>
                                <option value=''>Select a deal</option>
                                {deals.map(deal => (
                                    <option key={deal.id} value={deal.id}>{deal.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`form-group ${contact ? 'active' : ''}`}>
                          
                            <select value={contact} onChange={handleContactChange}>
                                <option value=''>Select a contact</option>
                                {contacts.map(contact => (
                                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                                ))}
                            </select>
                        </div>
                       
                        
                        <div className={`form-group ${endTime ? 'active' : ''}`}>
                            <input type="datetime-local" id="end-date" value={endTime} onChange = {(e)=>setEndTime(e.target.value)} required />
                            <label htmlFor="end-date">End Date</label>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                            Create
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${editModal ? 'show' : ''}`} onSubmit = {handleEditActivities} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Edit Activity</div>
                        <div className='icon' onClick={closeEditModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${description ? 'active' : ''}`}>
                            <textarea id="description" value={description} onChange = {(e)=>setDescription(e.target.value)} required />
                            <label htmlFor="description">Description</label>
                        </div>
                       
                        
                       
                        <div className={`form-group ${stage ? 'active' : ''}`}>
                          
                            <select value={stage} onChange={(e) => setStage(e.target.value)} required>
                                <option value="">Status</option>
                                <option value="NEW">New</option>
                                <option value="QUALIFICATION">Qualification</option>
                                <option value="DISCOVERY">Discovery</option>
                                <option value="PROPOSAL">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="CLOSED WON">Closed Won</option>
                                <option value="CLOSED LOST">Closed Lost</option>
                               
                            </select>
                        </div>
                        <div className={`form-group ${activityType ? 'active' : ''}`}>
                          
                            <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
                                <option value=''>Activity</option>
                                <option value='NOTE'>Note</option>
                                <option value='CALL'>Call</option>
                                <option value='MEETING'>Meeting</option>
                                <option value='EMAIL'>Email</option>
                            </select>
                        </div>
                        <div className={`form-group ${deals ? 'active' : ''}`}>
                          
                            <select value={dealsList} onChange={handleDealsChange}>
                                <option value=''>Select a deal</option>
                                {deals.map(deal => (
                                    <option key={deal.id} value={deal.id}>{deal.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`form-group ${contact ? 'active' : ''}`}>
                          
                            <select value={contact} onChange={handleContactChange}>
                                <option value=''>Select a contact</option>
                                {contacts.map(contact => (
                                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                                ))}
                            </select>
                        </div>
                       
                        
                        <div className={`form-group ${endTime ? 'active' : ''}`}>
                            <input type="datetime-local" id="end-date" value={endTime} onChange = {(e)=>setEndTime(e.target.value)} required />
                            <label htmlFor="end-date">End Date</label>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
           
            
            {showSnackbar && (
                <div className={` ${snackbarStatus==='success' ? 'snackbar-success' :'snackbar-danger'} `}>
                    {snackbarStatus === 'success' ? (
                        <>
                            <i class="fa-solid fa-circle-check"></i>
                            success!
                        </>
                    ):
                    (
                        <>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            fail!
                        </>
                    )
                }
                    
                </div>
            )}
        </div>
    );
};

export default Activity;