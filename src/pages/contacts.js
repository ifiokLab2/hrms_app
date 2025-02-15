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

const  Contacts = ()=>{
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
    
    const [type, setType] = useState('CUSTOMER');
    const [priority, setPriority] = useState('HIGH');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState('');
    const [contactId, setContactId] = useState('');
    const [organization, setOrganization] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [deals, setDeals] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [availableAccounts, setAvailableAccounts] = useState([]);
    const [availableDeals, setAvailableDeals] = useState([]);


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
    const toggleEditModal = (event,id,type,priority,title,name,comments,email,phone)=>{
        event.preventDefault();
        setEditModal(!editModal);
        setErrorMessage("");
        setType(type);
        setContactId(id);
        setPriority(priority);
        setTitle(title);
        setName(name);
        setComments(comments);
        setEmail(email);
        setPhone(phone);
        //setAccounts(accounts);
        //setDeals(deal);
       
       
    };
   
    const closeEditModal = ()=>{
        setEditModal(false);
        setErrorMessage("");
        setType('');
        setPriority('');
        setTitle('');
        setName('');
        setComments('');
        setEmail('');
        setPhone('');
        setContactId("");
        //setAccounts('');
        //setDeals('');
    };
    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    const handleContacts = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('type', type);
            formData.append('accounts', accounts);
            formData.append('priority',priority);
            formData.append('deals',deals);
            formData.append('title',title );
            formData.append('comments',comments);
            formData.append('email',email);
            formData.append('phone',phone);
            formData.append('name',name);
            //formData.append('date',date);
            const response = await axios.post(`${apiUrl}/contacts/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setsnackbarStatus('success');
                setShowSnackbar(true);
                setTimeout(() => {
                    setModal(false);
                    setIsLoading(isLoading);
                    setShowSnackbar(false);
                    fetchContacts();
                    setType('');
                    setPriority('');
                    setTitle('');
                    setName('');
                    setComments('');
                    setEmail('');
                    setPhone('');
                    setAccounts('');
                    setDeals('');
                    //fetchDeals()
             
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
    const handleEditContacts = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
            const formData = new FormData();
            formData.append('organization', Id);
            formData.append('type', type);
            formData.append('accounts', accounts);
            formData.append('priority',priority);
            formData.append('deals',deals);
            formData.append('title',title );
            formData.append('comments',comments);
            formData.append('email',email);
            formData.append('phone',phone);
            formData.append('name',name);
            //formData.append('date',date);
            const response = await axios.put(`${apiUrl}/contacts/${contactId}/edit/`, formData, {
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
                    setEditModal(false);
                    fetchContacts();
                    setShowSnackbar(false);
                    setType('');
                    setPriority('');
                    setTitle('');
                    setName('');
                    setComments('');
                    setEmail('');
                    setPhone('');
                    setAccounts('');
                    setDeals('');
                    
                    //fetchDeals()
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
    const handleDealChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selected.push(options[i].value);
          }
        }
        setDeals(selected);
    };
    const handleAcountChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selected.push(options[i].value);
          }
        }
        setAccounts(selected);
    };
    const handleDealDelete = async (event,id) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
           
            const response = await axios.delete(`${apiUrl}/deals/${id}/delete/`, {
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
                    //fetchDeals();
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
    const handleContactDelete = async (event,id) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
        try {
           
            const response = await axios.delete(`${apiUrl}/contacts/${id}/delete/`, {
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
                    fetchContacts();
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
            setIsLoading(true);
            const response = await axios.get(`${apiUrl}/contacts/${Id}/contact-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.all_contacts);
          setContacts(response.data.all_contacts);
          setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setContacts([]);
            console.error('Error fetching employees:', error.message);
        }
    }; 
    const fetchAccounts = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/accounts/${Id}/account-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          //console.log('response.data.all_leads:',response.data.all_contacts);
          setAccounts(response.data.all_account);
          //setLoading(false);
        } catch (error) {
          //setLoading(false);
          setAccounts([]);
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
          setAvailableDeals(response.data.all_deals);
          //setLoading(false);
        } catch (error) {
          //setLoading(false);
          setAvailableDeals([]);
          console.error('Error fetching employees:', error.message);
        }
    };   
  
    useEffect(() => {

        fetchDeals();
        fetchContacts();
        fetchAccounts();
      
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
                                Contacts
                            </div>
                            <div className='create-btn' onClick={toggleModal}>create</div>
                        </div>
                        <div className='apps-container'>
                           {isLoading ? (
                               <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                           ):(
                                <>
                                    {contacts.length === 0 ? (
                                        <p>No data available.</p>
                                    ):(
                                        <>
                                             {contacts.map((data,index) => (
                                                <Link key={data.id} to={`/organization/${data.id}/contact-detail/`} className='cards organization-card'>
                                                <div className='icon hrms-icon initials-cap'>
                                                    {data.initials}
                                                </div>
                                                <div className='text-wrapper'>
                                                    <div className='title-header'>{data.title}</div>
                                                    <p>{data.type} </p>
                                                    <div className='employee-count'>
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                                <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </div>
                                                {openModalIndex === index && (
                                                    <div className='option-modal'>
                                                    {/* Users should be able to click on edit tab to edit the specific organization */}
                                                    <div className='option-card' onClick={(event) => toggleEditModal(event,data.id,data.type, data.priority, data.title, data.name, data.comments, data.email,data.phone)}>Edit</div>
                                                    <div className='option-card' onClick={(event) => handleContactDelete(event,data.id)} >Delete</div>
                                                
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
            <form className={`organization-form ${modal ? 'show' : ''}`} onSubmit = {handleContacts} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create contacts</div>
                        <div className='icon' onClick={toggleModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input type="text" id="title" value={title} onChange = {(e)=>setTitle(e.target.value)} required placeholder='e.g COO,CEO' />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className={`form-group ${type ? 'active' : ''}`}>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">setType</option>
                                <option value="CUSTOMER">Customer</option>
                                <option value="LEAD">Lead</option>
                                <option value="QUALIFIED LEAD">Qualified Lead</option>
                                <option value="PARTNER">Partner</option>
                                <option value="VENDOR">Vendor</option>
                            </select>
                        </div>
                        {availableAccounts.length > 0 ? (
                            <div className={`form-group ${accounts ? 'active' : ''}`}>
                            <select multiple value={accounts} onChange={handleAcountChange}>
                                <option  value="">Accounts</option>
                                {availableAccounts.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                            </select>
                        </div>
                        ):(
                            ""
                        )}

                        {availableDeals.length > 0 ? (
                            <div className={`form-group ${accounts ? 'active' : ''}`}>
                            <select multiple value={deals} onChange={handleDealChange}>
                                {availableDeals.map(deal => (
                                <option key={deal.id} value={deal.id}>{deal.title}</option>
                                ))}
                            </select>
                        </div>
                        ):(
                            ""
                        )}
                        
                        <div className={`form-group ${priority ? 'active' : ''}`}>
                          
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Priority</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                        
                        <div className={`form-group ${name ? 'active' : ''}`}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='e.g John Smith' />
                            <label htmlFor="name">Name</label>
                        </div>
                        
                        <div className={`form-group ${comments ? 'active' : ''}`}>
                            <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
                            <label htmlFor="comment">Comments</label>
                        </div>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={`form-group ${phone ? 'active' : ''}`}>
                            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <label htmlFor="phone">Phone</label>
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
            <form className={`organization-form ${editModal ? 'show' : ''}`} onSubmit = {handleEditContacts} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>edit contacts</div>
                        <div className='icon' onClick={closeEditModal} >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input type="text" id="title" value={title} onChange = {(e)=>setTitle(e.target.value)} required placeholder='e.g COO,CEO' />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className={`form-group ${type ? 'active' : ''}`}>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="CUSTOMER">Customer</option>
                                <option value="LEAD">Lead</option>
                                <option value="QUALIFIED LEAD">Qualified Lead</option>
                                <option value="PARTNER">Partner</option>
                                <option value="VENDOR">Vendor</option>
                            </select>
                        </div>
                        {availableAccounts.length > 0 ? (
                            <div className={`form-group ${accounts ? 'active' : ''}`}>
                            <select multiple value={accounts} onChange={handleAcountChange}>
                                <option  value="">Accounts</option>
                                {availableAccounts.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                            </select>
                        </div>
                        ):(
                            ""
                        )}

                        {availableDeals.length > 0 ? (
                            <div className={`form-group ${accounts ? 'active' : ''}`}>
                            <select multiple value={deals} onChange={handleDealChange}>
                                {availableDeals.map(deal => (
                                <option key={deal.id} value={deal.id}>{deal.title}</option>
                                ))}
                            </select>
                        </div>
                        ):(
                            ""
                        )}
                        
                        
                        <div className={`form-group ${priority ? 'active' : ''}`}>
                          
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Priority</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                        
                        <div className={`form-group ${name ? 'active' : ''}`}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='e.g John Doe' />
                            <label htmlFor="name">Name</label>
                        </div>
                        
                        <div className={`form-group ${comments ? 'active' : ''}`}>
                            <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
                            <label htmlFor="comment">Comments</label>
                        </div>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={`form-group ${phone ? 'active' : ''}`}>
                            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <label htmlFor="phone">Phone</label>
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

export default Contacts;