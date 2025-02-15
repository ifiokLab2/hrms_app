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
import DesktopLogout from './desktop-logout';

//import hero1 from '../styles/hero1.jpg';

const StaffsTimesheetList = ()=>{
    const user = useSelector((state) => state.user.user);
    const { Id,name,userId } = useParams();
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
    const [requestType, setRequestType] = useState('Vacation');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [requestList, setRequestList] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [payrollHistory,setPayrollHistory] = useState([]);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [clients,setClients] = useState([]);
    const [employeesTimesheetModal,setEmployeesTimesheetModal] = useState(0);
   
    
    

   

   

    
   
    const toggleEmployeesTimesheetModal = (index) => {
        setEmployeesTimesheetModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const handleEmployeeTimesheet = async (status,timesheetId) => {
        setShowSnackbar(false);
        
        
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('timesheetId',timesheetId );
            const response = await axios.post(`${apiUrl}/staff-timesheet-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchTimeSheet();
                   
                   //fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 20);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                console.log('an error occurred');
                //setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
            // Handle unexpected errors
        }
    };
   
    const fetchTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/employee-timesheet/${userId}/${Id}/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setTimeSheet(response.data);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
   
   

    useEffect(() => {

       
        if (user=== null || user?.isEmployee === true ) {
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
        
       
       
      
        fetchProfileData();
        fetchOrganization();
       
        fetchTimeSheet();
      
       
        
        
    }, [Id,user,navigate]);
   
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
                       <div className='organization-header'>
                        <div className='box1'>
                            <div className='box1-logo'>
                                <img src={`${apiUrl}${organization.logo}`} alt = {organization.name}/>
                                <div className='org-name'>{organization.name}</div>
                            </div>
                        </div>
                        
                       </div>
                       <div className='organization-body'>
                            <div className = 'timesheet'>
                                <div className='body-title'>My TimeSheet</div>
                                <div className='time-bt' >
                                   
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>Organization</th>
                                   
                                    <th>Hours worked</th>
                                    <th>Client Approved</th>
                                   
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
                                       
          
                                        <td className={`status ${employeesTimesheetModal === 0 ? 'show' :''}`} onClick={() => toggleEmployeesTimesheetModal(employee.id)} >
                                            <span>{employee.client_approved}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {employeesTimesheetModal === employee.id && (
                                                <div className = 'status-modal'>
                                                   
                                                   <div className='card' onClick={()=>handleEmployeeTimesheet('Pending',employee.id)}>Pending</div>
                                                   <div className='card' onClick={()=>handleEmployeeTimesheet('Processing',employee.id)}>Processing</div>
                                                   <div className='card' onClick={()=>handleEmployeeTimesheet('Processed',employee.id)}>Processed</div>
                                                   <div className='card' onClick={()=>handleEmployeeTimesheet('Rejected',employee.id)}>Rejected</div>
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
                                        <td><Link to ={`/employee/timesheet/detail/${employee.id}/${Id}/${name}/`}>view</Link></td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                        
                       
                      
                      
                      
                    </div>
                </div>
            </div>

           
           

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

export default StaffsTimesheetList;