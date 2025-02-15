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

const Leads = ()=>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { Id } = useParams();
    const user = useSelector(state => state.user.user);
    const [modal,setModal] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [title,setTitle] = useState("");
    const [leadId,setLeadId] = useState("");
    const [name,setName] = useState("");
    const [status,setStatus] = useState("");
    const [company,setCompany] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [date,setDate] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [Leads,setLeads] = useState([]);
    const [Loading,setLoading] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);


    const toggleModal = ()=>{
        setModal(!modal);
    };
    const toggleEditModal = (event,id,name,email,title,company,phone,status,date)=>{
        event.preventDefault();
        setEditModal(!editModal);
        setLeadId(id);
        setName(name);
        setEmail(email);
        setTitle(title);
        setCompany(company);
        setPhone(phone);
        setStatus(status);
        setDate(date);
    };
    const closeEditModal = ()=>{
        setEditModal(false);
        setLeadId('');
    };
    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    const handleLead = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('name', name);
            formData.append('title', title );
            formData.append('company',company );
            formData.append('status',status );
            formData.append('email',email );
            formData.append('phone',phone);
            formData.append('date',date);
            const response = await axios.post(`${apiUrl}/leads-create/`, formData, {
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
                    
                    
                    setName('');
                    setEmail('');
                    setTitle('');
                    setCompany('');
                    setPhone('');
                    setStatus('');
                    setDate('');
                    setModal(false);
                    fetchLeads();
             
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
    const handleLeadDelete = async (event,id) => {
        event.preventDefault();
        //etIsLoading(!isLoading);
       
        
        try {
           
            const response = await axios.delete(`${apiUrl}/leads/${id}/`, {
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
                    fetchLeads();
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
    const handleEditLead = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('name', name);
            formData.append('title', title );
            formData.append('company',company );
            formData.append('status',status );
            formData.append('email',email );
            formData.append('phone',phone);
            formData.append('date',date);
            const response = await axios.put(`${apiUrl}/leads/${leadId}/`, formData, {
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
                    closeEditModal(false);
                    
                    setName('');
                    setEmail('');
                    setTitle('');
                    setCompany('');
                    setPhone('');
                    setStatus('');
                    setDate('');
                    setModal(false);
                    fetchLeads();
             
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
    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/user/${Id}/leads/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          console.log('response.data.all_leads:',response.data.all_leads);
          setLeads(response.data.all_leads);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setLeads([]);
          console.error('Error fetching employees:', error.message);
        }
    };  
  
    useEffect(() => {
           

        fetchLeads();
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
                                Leads
                            </div>
                            <div className='create-btn' onClick={toggleModal}>create</div>
                        </div>
                        <div className='apps-container'>
                            {Loading ? (
                                 <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ):(
                                <>
                                    {Leads.length === 0 ? (
                                       <p>No data available.</p>
                                    ):(
                                        <>
                                            {Leads.map((data,index) => (
                                                <Link key={data.id} to={`/organization/${data.id}/leads-detail/`} className='cards organization-card'>
                                                    <div className='icon hrms-icon initials-cap'>
                                                        {data.initials.toUpperCase()}
                                                    </div>
                                                    <div className='text-wrapper'>
                                                        <div className='title-header'>{data.name}</div>
                                                        <p>{data.title} at {data.company}</p>
                                                        <div className='employee-count'>
                                                            
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                    </div>
                                                    {openModalIndex === index && (
                                                        <div className='option-modal'>
                                                        {/* Users should be able to click on edit tab to edit the specific organization */}
                                                        <div className='option-card' onClick={(event) => toggleEditModal(event,data.id,data.name, data.email, data.title, data.company, data.phone, data.status, data.date)}>Edit</div>
                                                        <div className='option-card' onClick={(event) => handleLeadDelete(event,data.id)} >Delete</div>
                                                    
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
            <form className={`organization-form ${modal ? 'show' : ''}`} onSubmit = {handleLead} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create Leads</div>
                        <div className='icon' onClick={toggleModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${name ? 'active' : ''}`}>
                            <input type="text" id="name" value={name} onChange = {(e)=>setName(e.target.value)} required placeholder='e.g John Doe' />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className={`form-group ${status ? 'active' : ''}`}>
                          
                            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">Status</option>
                                <option value="NEW">New Lead</option>
                                <option value="ATTEMPTED">Attempted to contact</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="QUALIFIED">Qualified</option>
                                <option value="UNQUALIFIED">Unqualified</option>
                               
                            </select>
                        </div>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" id="email" value={email} onChange = {(e)=>setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input type="text" id="title" value={title} onChange = {(e)=>setTitle(e.target.value)} required placeholder='e.g CEO, COO' />
                            <label htmlFor="title">Title</label>
                        </div>
                        
                        <div className={`form-group ${company ? 'active' : ''}`}>
                            <input type="text" id="company" value={company} onChange = {(e)=>setCompany(e.target.value)} required />
                            <label htmlFor="company">Company</label>
                        </div>
                        <div className={`form-group ${phone ? 'active' : ''}`}>
                            <input type="text" id="phone" value={phone} onChange = {(e)=>setPhone(e.target.value)} required />
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className={`form-group ${date ? 'active' : ''}`}>
                            <input type="datetime-local" id="date" value={date} onChange = {(e)=>setDate(e.target.value)} required />
                            <label htmlFor="date">Date</label>
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
            <form className={`organization-form ${editModal ? 'show' : ''}`} onSubmit = {handleEditLead} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Edit Leads</div>
                        <div className='icon' onClick={closeEditModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${name ? 'active' : ''}`}>
                            <input type="text" id="name" value={name} onChange = {(e)=>setName(e.target.value)} required />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className={`form-group ${status ? 'active' : ''}`}>
                          
                            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">Status</option>
                                <option value="NEW">New Lead</option>
                                <option value="ATTEMPTED">Attempted to contact</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="QUALIFIED">Qualified</option>
                                <option value="UNQUALIFIED">Unqualified</option>
                               
                            </select>
                        </div>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" id="email" value={email} onChange = {(e)=>setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input type="text" id="title" value={title} onChange = {(e)=>setTitle(e.target.value)} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        
                        <div className={`form-group ${company ? 'active' : ''}`}>
                            <input type="text" id="company" value={company} onChange = {(e)=>setCompany(e.target.value)} required />
                            <label htmlFor="company">Company</label>
                        </div>
                        <div className={`form-group ${phone ? 'active' : ''}`}>
                            <input type="text" id="phone" value={phone} onChange = {(e)=>setPhone(e.target.value)} required />
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className={`form-group ${date ? 'active' : ''}`}>
                            <input type="datetime-local" id="date" value={date} onChange = {(e)=>setDate(e.target.value)} required />
                            <label htmlFor="date">Date</label>
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

export default Leads