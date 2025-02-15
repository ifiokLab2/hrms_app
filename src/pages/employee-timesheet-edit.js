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

const EmployeeTimesheetEdit= ()=>{
    const user = useSelector((state) => state.user.user);
    const { Id,timesheet_id,name } = useParams();
    const [organization,setOrganization] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [loading,setLoading] = useState(true);
   
    const navigate = useNavigate();
   

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
        setShowSnackbar(false);
      
        
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
           
            const response = await axios.put(`${apiUrl}/user-timesheet/${formData.id}/detail/`, sanitizedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            console.log('TimeSheet edit:', response.data);
            setIsLoading(isLoading);
            setShowSnackbar(true);
            setsnackbarStatus('success');
            fetchTimeSheet();
           
          
            
            // Do something after successful submission
        } catch (error) {
            setShowSnackbar(true);
            setsnackbarStatus('fail');
            console.error('Error creating TimeSheet:', error);
        }
    };
    const  TimesheetSubmit = async (e) => {
        e.preventDefault();
        setIsLoading2(!isLoading2);
        setShowSnackbar(false);
      
        
        try {   
            const sanitizedFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, value === null ? '' : value])
            );
            const totalHours = calculateTotalHours(formData); 
            setFormData((prevData) => ({
                ...prevData,
                total_hours: totalHours,
            }));

           
            const response = await axios.put(`${apiUrl}/submit-timesheet-approval/${timesheet_id}/`,sanitizedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
           
            setIsLoading2(isLoading2);
            setShowSnackbar(true);
            setsnackbarStatus('success');
            fetchTimeSheet();
           
          
            
            // Do something after successful submission
        } catch (error) {
            setShowSnackbar(true);
            setsnackbarStatus('fail');
            console.error('Error creating TimeSheet:', error);
        }
    };

    const  TimesheetDelete = async (e) => {
        e.preventDefault();
        setIsLoading3(!isLoading3);
        setShowSnackbar(false);
      
        
        try {   
           
            const response = await axios.delete(`${apiUrl}/user-timesheet-delete/${timesheet_id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
           
            setIsLoading3(isLoading3);
            setShowSnackbar(true);
            setsnackbarStatus('success');
            navigate(`/employee/organization/dashboard/${Id}/${name}/`);
            
           
          
            
            // Do something after successful submission
        } catch (error) {
            setShowSnackbar(true);
            setsnackbarStatus('fail');
            console.error('Error creating TimeSheet:', error);
        }
    };

   

    
   
   
   
    const fetchTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/user-timesheet/${timesheet_id}/detail/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          console.log('response.data:',response.data[0]);
          setFormData(response.data[0]);
          setTimeSheet(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading(false);
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
                const response = await axios.get(`${apiUrl}/clients/list/${Id}`, {
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
        
       
       
      
        fetchProfileData();
        fetchOrganization();
        
        fetchTimeSheet();
        
        fetchClients();
        
        
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
                       
                    <form id='organization-form-edit' className="organization-form timesheet-modal" onSubmit={handleGeneralTimesheetSubmit}>
                        {loading ? (
                            <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                        ):(
                            <div className="form-wrappe" >
                            <div className="form-header">
                                <div className="title">TimeSheet</div>
                                <div className="icon" >
                                   
                                </div>
                            </div>
                            <div className="form-group">
                              
                               {formData.has_client === 'exist' ? (
                                <div>Client:{formData.client_name}</div>
                               ):(
                                ""
                               )}
                                
                               
                            </div>
                            <div className="form-group">
                                <div>Start Date:{formData.start_date}</div>
                                
                            </div>
                            <div className="form-group">
                                <div>End Date:{formData.end_date}</div>
                               
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
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_sun"
                                                value={formData.hours_worked_sun || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_mon"
                                                value={formData.hours_worked_mon || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_tue"
                                                value={formData.hours_worked_tue || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_wed"
                                                value={formData.hours_worked_wed || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_thur"
                                                value={formData.hours_worked_thur || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="hours_worked_fri"
                                                value={formData.hours_worked_fri || ''}
                                                onChange={handleChange}
                                                placeholder="Enter hours"
                                                disabled={formData.final_approval}
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
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_sun"
                                                value={formData.activity_description_sun}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_mon"
                                                value={formData.activity_description_mon}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_tue"
                                                value={formData.activity_description_tue}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_wed"
                                                value={formData.activity_description_wed}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_thur"
                                                value={formData.activity_description_thur}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="activity_description_fri"
                                                value={formData.activity_description_fri}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                disabled={formData.final_approval}
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
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_sun"
                                                value={formData.allowance_sun || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_mon"
                                                value={formData.allowance_mon || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_tue"
                                                value={formData.allowance_tue || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_wed"
                                                value={formData.allowance_wed || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_thur"
                                                value={formData.allowance_thur || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="allowance_fri"
                                                value={formData.allowance_fri || ''}
                                                onChange={handleChange}
                                                placeholder="allowance"
                                                disabled={formData.final_approval}
                                            />
                                        </td>
                                        {/* Calculate total hours */}
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='btn-wrapper-timesheet' >
                                <div className='back' onClick={()=>{navigate(`/employee/organization/dashboard/${Id}/${name}/`)}}>
                                    Back
                                </div>
                                {formData.final_approval === true ? (
                                    ""
                                ):(
                                    <>
                                    <div className='delete-btn' onClick={TimesheetDelete} >
                                        Delete
                                        {isLoading3 ? <div className="loader"></div> : '' }
                                    </div>
                                    <button type="submit">
                                        Save
                                        {isLoading ? <div className="loader"></div> : '' }
                                    </button>
                                    <button type="button" style={{margin:'0 4px'}} onClick = {TimesheetSubmit} >
                                        Submit
                                        {isLoading2 ? <div className="loader"></div> : '' }
                                    </button>
                                    </>
                                )}
                                
                            </div>
                        </div>
                        )}
                    </form>
                      
                      
                      
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

export default EmployeeTimesheetEdit;