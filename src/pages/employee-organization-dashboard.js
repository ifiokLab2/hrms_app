import React, { useState,useEffect } from 'react';
//import { Link,useNavigate } from 'react-router-dom';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import '../styles/organization-dashboard.css';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import Header from '../components/header';
import '../styles/snackbar.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DesktopLogout from './desktop-logout';

//import hero1 from '../styles/hero1.jpg';

const EmployeeOrganizationDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const { Id,name } = useParams();
    const [organization,setOrganization] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   
    const navigate = useNavigate();
    const [openSlideSections, setOpenSlideSections] = useState(0);
    
    const [timesheetModal,setTimesheetModal] = useState(false);

    const [taskName,setTaskName] = useState('');
    const [activityDescription,setActivityDescription] = useState('');
    const [endingDate,setEndingDate] = useState('');
    const [hoursWorked,setHoursWorked] = useState('');
    const [timeSheet,setTimeSheet] = useState([]);
    const [requestModal,setRequestModal] = useState(false);
    const [reportModal,setReportModal] = useState(false);
    const [requestType, setRequestType] = useState('Vacation');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [requestList, setRequestList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [payrollHistory,setPayrollHistory] = useState([]);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [clients,setClients] = useState([]);
    const [loading,setLoading] = useState(true);

    const [title,setTitle] = useState('');
    const [date,setDate] = useState('');
    const [content,setContent] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);


    const [formData, setFormData] = useState({
        client: '',
        organization:Id,
        start_date: '',
        end_date: '',
        hours_worked_sat: null,
        hours_worked_sun: null,
        hours_worked_mon: null,
        hours_worked_tue: null,
        hours_worked_wed: null,
        hours_worked_thur: null,
        hours_worked_fri: null,
        
        allowance_sat: null,
        allowance_sun: null,
        allowance_mon: null,
        allowance_tue: null,
        allowance_wed: null,
        allowance_thur: null,
        allowance_fri: null,

        activity_description_sat: '',
        activity_description_sun: '',
        activity_description_mon: '',
        activity_description_tue: '',
        activity_description_wed: '',
        activity_description_thur: '',
        activity_description_fri: '',
        total_hours: 0, // Initialize total_hours
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            total_hours: calculateTotalHours({ ...formData, [name]: value }), // Update total hours when any day's hours are changed
        });
        console.log('FormData:', formData); // Log formData to check the values
        console.log('Total Hours:', calculateTotalHours({ ...formData, [name]: value })); // Log total hours calculation
    };
    

    const calculateTotalHours = (data) => {
        let total = 0;
       
        // Calculate total hours for each day and add to total
        for (const [key, value] of Object.entries(data)) {
            if (key.startsWith('hours_worked_') && value !== null && !isNaN(value)) {
                total += parseFloat(value);
            }
        }
        return total;
    };

    const  handleGeneralTimesheetSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(showSnackbar);
       
       
      
        
        try {
            const sanitizedFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, value === null ? '' : value])
            );
            const totalHours = calculateTotalHours(formData); 
            setFormData((prevData) => ({
                ...prevData,
                total_hours: totalHours,
            }));

            console.log('filteredFormData:', sanitizedFormData);    
           
            const response = await axios.post(`${apiUrl}/create-time-sheet/`, sanitizedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            console.log('TimeSheet created:', response.data);
            setIsLoading(isLoading);
            toggleTimeSheetModal();
            setsnackbarStatus('success');
            setShowSnackbar(!showSnackbar);
            
            fetchTimeSheet();
            
            // Do something after successful submission
        } catch (error) {
            setsnackbarStatus('fail')
            console.error('Error creating TimeSheet:', error);
        }
    };

   

    
    const toggleTimeSheetModal = ()=>{
        setTimesheetModal(!timesheetModal);
        setErrorMessage('');
    };
    const toggleRequestModal = ()=>{
        setErrorMessage('');
        setRequestModal(!requestModal);
    };
    const toggleReportModal = ()=>{
        setErrorMessage('');
        setReportModal(!reportModal);
    };
    const handleTimeSheet = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
       
        
        try {
            const formData = new FormData();
            formData.append('end_date', endingDate);
            formData.append('task_name', taskName);
            formData.append('hours_worked', hoursWorked );
            formData.append('activity_description',activityDescription );
            formData.append('organization',Id );
            const response = await axios.post(`${apiUrl}/create-time-sheet/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEndingDate('');
                    setTaskName('');
                    setHoursWorked('');
                    setActivityDescription('');
                    setTimesheetModal(!timesheetModal);
                    fetchTimeSheet();
             
                    //navigate('/');
                   
                }, 2000);
                setShowSnackbar(true);
                setsnackbarStatus('success');
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(true);
                setsnackbarStatus('fail');
                setErrorMessage(response.data.message);
                setIsLoading(isLoading);
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
    const fetchPayrollHistory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/employee-payroll-history/${Id}/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
         
          //console.log(response.data);
          setPayrollHistory(response.data.all_payroll);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const handleRequest = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('end_date', endDate);
            formData.append('start_date', startDate);
            formData.append('reason', reason);
            formData.append('request_type',requestType);
            formData.append('organization',Id );
            const response = await axios.post(`${apiUrl}/request/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEndDate('');
                    setStartDate('');
                    setReason('');
                    setRequestType('');
                    setRequestModal(!requestModal);
                    fetchRequest();
                   
                    //fetchTimeSheet();
                   
                }, 2000);
                setShowSnackbar(true);
                setsnackbarStatus('success');
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(false);
                setsnackbarStatus('fail');
                setErrorMessage(response.data.message);
                setIsLoading(isLoading);
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
    const handleReport = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('date', date);
            formData.append('content', content);
            formData.append('organization',Id );
            formData.append('city',city );
            
            const response = await axios.post(`${apiUrl}/report/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setDate('');
                    setTitle('');
                    setContent('');
                    setCity('');
                    setReportModal(!reportModal);
                    //fetchRequest();
                   
                    //fetchTimeSheet();
                   
                }, 2000);
                setShowSnackbar(true);
                setsnackbarStatus('success');
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(false);
                setsnackbarStatus('fail');
                setErrorMessage(response.data.message);
                setIsLoading(isLoading);
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
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
   
   
    const fetchTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/time-sheet/${Id}/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setTimeSheet(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading(false);
        }
    };
    const fetchRequest = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/request/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setRequestList(response.data.all_requests);
        } catch (error) {
          console.error('Error fetching request:', error.message);
        }
    };
    const fetchReport = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/user/report/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          console.log(response.data);
          setReportList(response.data)
         
        } catch (error) {
          console.error('Error fetching request:', error.message);
        }
    };
   
   

    useEffect(() => {

       
        if (user=== null || user?.isEmployer === true ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        };
        const fetchOrganization = async () => {
            try {
              const response = await axios.get(`${apiUrl}/organization/${Id}/`);
             
              setOrganization(response.data);
            } catch (error) {
              console.error('Error fetching organization:', error.message);
            }
        };
        const fetchClients = async () => {
            try {
                const response = await axios.get(`${apiUrl}/staff/clients/list/${Id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                    },
                });
                //console.log(response.data.all_courses)
                setClients(response.data.all_clients);
              
            } catch (error) {
                console.error('Error fetching clients:', error);
                //setLoading(false);
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
        
        const fetchCity = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCities(response.data);
                console.log('response.data:',response.data);
               
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };
            
       
        
       
       
        
        fetchCity();
        fetchProfileData();
        fetchOrganization();
        fetchRequest();
        fetchTimeSheet();
        fetchPayrollHistory();
        fetchClients();
        fetchReport();
        
        
    }, [Id,user,navigate]);
   
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
                        <Link className = 'card'>
                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <span className = 'title'>Apps</span>
                        </Link>
                        <Link to='/organizations/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organization </span>
                        </Link>
                        <Link to={`/organization/${Id}/sales-funnel/`} className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Sales Funnel</span>
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
                       <div className='organization-header'>
                        <div className='box1'>
                            <div className='box1-logo'>
                                <img src={`${apiUrl}${organization.logo}`} alt = {organization.name}/>
                                <div className='org-name'>{organization.name} </div>
                            </div>
                        </div>
                        <div className='box2'>
                            <div className={`tabs ${openSlideSections === 0 ? 'active' :''}`} onClick={() => toggleSlider(0)}>TimeSheet</div>
                            {organization.organization_type === 'HEALTH' ? (
                                 <div className={`tabs ${openSlideSections === 4 ? 'active' :''}`} onClick={() => toggleSlider(4)}>Client List</div>
                            ) 
                            :(
                                ""
                            ) 
                            }
                           <div className={`tabs ${openSlideSections === 5 ? 'active' :''}`} onClick={() => toggleSlider(5)}>Reports</div> 
                            <div className={`tabs ${openSlideSections === 1 ? 'active' :''}`} onClick={() => toggleSlider(1)}>Requests</div>
                           {/* <div className={`tabs ${openSlideSections === 2 ? 'active' :''}`} onClick={() => toggleSlider(2)}>Notifications</div>
                            <div className={`tabs ${openSlideSections === 3 ? 'active' :''}`} onClick={() => toggleSlider(3)}>Payroll History</div> */}
                            
                           
                        </div>
                       </div>
                       {openSlideSections === 0 && (
                           <>
                                {loading ? (
                                    <>
                                        <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                    </>
                                ):(
                                  <>     
                                    {timeSheet.length === 0 ? (
                                        <div className='organization-body'>
                                            <div className = 'timesheet'>
                                                <div className='body-title'>You haven't created any timesheets yet.</div>
                                                <div className='time-btn' onClick={toggleTimeSheetModal}>
                                                    Create TimeSheet
                                                </div>
                                            
                                            </div> 
                                        </div>
                                    ) : ( 
                                    
                                        <div className='organization-body'>
                                        <div className = 'timesheet'>
                                            <div className='body-title'>My TimeSheet</div>
                                            <div className='time-btn' onClick={toggleTimeSheetModal}>
                                                Create TimeSheet
                                            </div>
                                        
                                        </div>
                                        {organization.organization_type === 'HEALTH' ? (
                                            <table>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                                <th>Start date</th>
                                                <th>End date</th>
                                                <th>Organization</th>
                                                <th>Client</th>
                                                <th>Hours worked</th>
                                                <th>Client Approved</th>
                                                <th>Organization Approved</th>
                                                <th>Detail</th>
                                                {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {timeSheet.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>#{employee.id}</td>
                                                    <td>{employee.start_date}</td>
                                                    <td>{employee.end_date}</td>
                                                
                                                    <td>{employee.organization}</td>
                                                    <td>{employee.client}</td>
                                                
                            
                                                    <td>{employee.hours_worked}</td>
                                                    <td>{employee.client_approved}</td>
                                                    <td>{employee.organization_approved}</td>
                                                    <td><Link to ={`/employee/timesheet/edit/${employee.id}/${Id}/${name}/`}>view</Link></td>
                                                
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        ):
                                        (
                                            <table>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                                <th>Start date</th>
                                                <th>End date</th>
                                                <th>Organization</th>
                                            
                                                <th>Hours worked</th>
                                            
                                                <th>Organization Approved</th>
                                                <th>Detail</th>
                                                {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {timeSheet.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>#{employee.id}</td>
                                                    <td>{employee.start_date}</td>
                                                    <td>{employee.end_date}</td>
                                                
                                                    <td>{employee.organization}</td>
                                                
                                                
                            
                                                    <td>{employee.hours_worked}</td>
                                                
                                                    <td>{employee.organization_approved}</td>
                                                    <td><Link to ={`/employee/timesheet/edit/${employee.id}/${Id}/${name}/`}>view</Link></td>
                                                
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        )
                                    }
                                        </div>
                                    )}
                                  </>
                                )}
                           </>
                       )}
                        {openSlideSections === 1 && (
                            <>
                                {loading ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                            ):(
                                <>
                                    {requestList.length === 0 ? (
                                        <div className='organization-body'>
                                            `<div className = 'timesheet'>
                                                <div className='body-title'> You have not made any requests yet. Start by submitting a new request or contact support if you need assistance.</div>
                                                <div className='time-btn' onClick={toggleRequestModal}>
                                                    Create Request
                                                </div>`
                                            </div>
                                        </div>
                                    ):(
                                        <div className='organization-body'>
                                        <div className = 'timesheet'>
                                            <div className='body-title'>My Requests</div>
                                            <div className='time-btn' onClick={toggleRequestModal}>
                                                Create Request
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                                <th>Start date</th>
                                                <th>End date</th>
                                                <th>Organization</th>
                                                <th>Request type</th>
                                            
                                                <th>Status</th>
                                                {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requestList.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>#{employee.organization}{employee.id}</td>
                                                    <td>{employee.start_date}</td>
                                                    <td>{employee.end_date}</td>
                                                    <td>{employee.organization}</td>
                                                    <td>{employee.request_type}</td>
                                                    <td>{employee.status}</td>
                                                
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    )}
                                </>
                            )}
                            </>
                       )}
                        {openSlideSections === 3 && (
                        <div className='organization-body'>
                        <div className='body-title'>Payroll History</div>
                        <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Employee</th>
                                  <th>Organization</th>
                                  <th>Hourly rate</th>
                                  <th>salary</th>
                                  <th>Status</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {payrollHistory.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.date}</td>
                                    <td>{employee.user}</td>
                                    <td>
                                     {employee.organization}
                                    </td>
                                    <td>${employee.hourly_rate}/hr</td>
                                    <td>
                                     ${employee.salary_amount}
                                    </td>
                                    <td className={`status`} >
                                            <span>{employee.status}</span>
                                            
                                            
                                            
                                        </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                       
                      </div>
                        )}
                        {openSlideSections === 4 && (
                          <>
                            {loading ? (
                                <>
                                <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            </>
                            ):(
                                <>
                                    {clients.length === 0 ? (
                                        <div className='organization-body'>
                                            <div className = 'timesheet'>
                                                <div className='body-title'> No clients have been assigned to you at this time. Please check back later or contact your administrator for more information.</div>
                                                <div className='time-bt' >
                                                
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='organization-body'>
                                        <div className = 'timesheet'>
                                            <div className='body-title'>Clients</div>
                                            <div className='time-bt' >
                                            
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                            
                                                <th>Name</th>
                                                <th>Organization</th>
                                                <th>Hourly rate</th>
                                                
                                                {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clients.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>#{employee.organization}{employee.id}</td>
                                                    <td>{employee.name}</td>
                                                    <td>{employee.organization}</td>
                                                    <td>${employee.hourly_rate}/hr</td>
                                                
                                            
                                                    
                                                
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    )}
                                </>
                            )}
                          </>
                       )}
                       {openSlideSections === 5 && (
                            <>
                                {loading ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                            ):(
                                <>
                                    {reportList.length === 0 ? (
                                        <div className='organization-body'>
                                            `<div className = 'timesheet'>
                                                <div className='body-title'> You have not made any reports yet. Start by submitting a new report or contact support if you need assistance.</div>
                                                <div className='time-btn' onClick={toggleReportModal}>
                                                    Create Report
                                                </div>`
                                            </div>
                                        </div>
                                    ):(
                                        <div className='organization-body'>
                                        <div className = 'timesheet'>
                                            <div className='body-title'>Report List</div>
                                            <div className='time-btn' onClick={toggleReportModal}>
                                                Create Report
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                                <th>Date</th>
                                                <th>Title</th>
                                                <th>Content</th>
                                                <th>Organization</th>
                                                
                                                {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportList.map((data) => (
                                                <tr key={data.id}>
                                                    <td>#{data.organization}{data.id}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.title}</td>
                                                    <td>{data.content}</td>
                                                    <td>{data.organization}</td>
                                                   
                                                
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    )}
                                </>
                            )}
                            </>
                       )}
                        
                       
                      
                      
                      
                    </div>
                </div>
            </div>

           
           
            <form className={`organization-form ${reportModal ? 'timesheet-modal' : ''}`} onSubmit = {handleReport} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create report</div>
                        <div className='icon' onClick={toggleReportModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input id="title" value={title}  onChange={(e) => setTitle(e.target.value)} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className={`form-group ${content ? 'active' : ''}`}>
                            <textarea id="content" value={content}  onChange={(e) => setContent(e.target.value)} required></textarea>
                        
                            <label htmlFor="content">Description</label>
                        </div>
                    
                        <div className={`form-group ${date ? 'active' : ''}`}>
                            <div className='date'>Date:</div>
                            <input id='date'  type='date' value={date} onChange = {(event)=>setDate(event.target.value)} required />
                        
                        </div>
                        
                        <div className={`form-group ${city ? 'active' : ''}`}>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            
                            >
                                <option value="">Location(optional):</option>
                                {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                                ))}
                            </select>
                            
                        </div>
                        
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Create report
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${requestModal ? 'timesheet-modal' : ''}`} onSubmit = {handleRequest} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create request</div>
                        <div className='icon' onClick={toggleRequestModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${requestType ? 'active' : ''}`}>
                            <select
                                id="requestType"
                                value={requestType}
                                onChange={(e) => setRequestType(e.target.value)}
                                >
                                {/* Add options for request types */}
                                <option value="Vacation">Vacation</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Work from Home">Work from Home</option>
                                <option value="Business Travel">Business Travel</option>
                                <option value="Training">Training</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Paternity Leave">Paternity Leave</option>
                                <option value="Unpaid Leave">Unpaid Leave</option>
                                <option value="Remote Work">Remote Work</option>
                                <option value="Conference Attendance">Conference Attendance</option>
                                <option value="Family Emergency">Family Emergency</option>
                                <option value="Personal Development">Personal Development</option>
                                <option value="Community Service">Community Service</option>
                                <option value="Study Leave">Study Leave</option>
                                <option value="Flex Time">Flex Time</option>
                                <option value="Sabbatical">Sabbatical</option>
                                <option value="Resignation">Resignation</option>
                                <option value="Other">Other</option>
                                {/* Add other request types as needed */}
                            </select>
                            <label htmlFor="requestType">Request</label>
                        </div>
                        <div className={`form-group ${ reason ? 'active' : ''}`}>
                            <textarea id="reason" value={reason}  onChange={(e) => setReason(e.target.value)} required></textarea>
                        
                            <label htmlFor="reason">Reason</label>
                        </div>
                    
                        <div className={`form-group ${startDate ? 'active' : ''}`}>
                            <div className='date'>start date:</div>
                            <input id='start-date'  type='date' value={startDate} onChange = {(event)=>setStartDate(event.target.value)} required />
                        
                        </div>
                        <div className={`form-group ${endDate ? 'active' : ''}`}>
                            <div className='date'>End date:</div>
                            <input id='end-date'  type='date' value={endDate} onChange = {(event)=>setEndDate(event.target.value)} required />
                        
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
            <form className={`organization-form ${timesheetModal ? 'timesheet-modal' : ''}`} onSubmit={handleGeneralTimesheetSubmit}>
            <div className="form-wrapper" id="timesheet-table-wrapper">
                <div className="form-header">
                    <div className="title">Create TimeSheet</div>
                    <div className="icon" onClick={toggleTimeSheetModal}>
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
                <div className="form-group">
                    {organization.organization_type === 'HEALTH' ? (
                            <>
                                
                                <select
                                    id="client"
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="" disabled>Select Clients</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ):
                        (
                            ""
                        )
                    }
                   
                </div>
                <div className="form-group">
                    <div>Start Date:</div>
                    <input
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <div>End Date:</div>
                    <input
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <table id='timesheet-table' >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sat</th>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thur</th>
                            <th>Fri</th>
                            <th>Total hours</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>Hours</td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_sat"
                                    value={formData.hours_worked_sat || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_sun"
                                    value={formData.hours_worked_sun || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_mon"
                                    value={formData.hours_worked_mon || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_tue"
                                    value={formData.hours_worked_tue || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_wed"
                                    value={formData.hours_worked_wed || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_thur"
                                    value={formData.hours_worked_thur || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hours_worked_fri"
                                    value={formData.hours_worked_fri || ''}
                                    onChange={handleChange}
                                    placeholder="Enter hours"
                                />
                            </td>
                            {/* Calculate total hours */}
                            <td>{formData.total_hours}</td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_sat"
                                    value={formData.activity_description_sat}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_sun"
                                    value={formData.activity_description_sun}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_mon"
                                    value={formData.activity_description_mon}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_tue"
                                    value={formData.activity_description_tue}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_wed"
                                    value={formData.activity_description_wed}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_thur"
                                    value={formData.activity_description_thur}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="activity_description_fri"
                                    value={formData.activity_description_fri}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </td>
                           
                            <td></td> 
                        </tr>
                        <tr>
                            <td>Daily allowance</td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_sat"
                                    value={formData.allowance_sat || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_sun"
                                    value={formData.allowance_sun || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_mon"
                                    value={formData.allowance_mon || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_tue"
                                    value={formData.allowance_tue || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_wed"
                                    value={formData.allowance_wed || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_thur"
                                    value={formData.allowance_thur || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="allowance_fri"
                                    value={formData.allowance_fri || ''}
                                    onChange={handleChange}
                                    placeholder="allowance"
                                />
                            </td>
                            {/* Calculate total hours */}
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className='btn-wrapper-timesheet' >
                    <button type="submit">
                        Save
                        {isLoading ? <div className="loader"></div> : '' }
                    </button>
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

export default EmployeeOrganizationDashboard;