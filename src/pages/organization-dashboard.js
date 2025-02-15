import React, { useState,useEffect } from 'react';
//import { Link,useNavigate } from 'react-router-dom';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import '../styles/organization-dashboard.css';
import 'swiper/swiper-bundle.css';
import '../styles/snackbar.css';
import '../styles/employer-dashboard.css';
import Header from '../components/header';
import DesktopLogout from './desktop-logout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

//import hero1 from '../styles/hero1.jpg';

const OrganizationDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const { Id } = useParams();
    const [organization,setOrganization] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [employeeName,setEmployeeName] = useState('');
    const navigate = useNavigate();
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const [StatusModal, setStatusModal] = useState(0);
    const [memberModal,setMemberModal] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments,setDepartments] = useState([]);
   
    const [date,setDate] = useState('');
    const [reason,setReason] = useState('');
    const [actionType,setActionType] = useState('');
    const [offboardingList,setOffboardingList] = useState([]);
    const [onboardingList,setOnboardingList] = useState([]);
    const [removeEmployeeModal,setRemoveEmployeeModal] = useState(false);
    const [timesheetModal,setTimesheetModal] = useState(false);

    const [taskName,setTaskName] = useState('');
    const [activityDescription,setActivityDescription] = useState('');
    const [endingDate,setEndingDate] = useState('');
    const [hoursWorked,setHoursWorked] = useState('');
    const [timeSheet,setTimeSheet] = useState([]);
    const [organizationTimeSheet,setOrganizationTimeSheet] = useState([]);
    const [payrollData, setPayrollData] = useState([]);
    const [totalSalary,setTotalSalary] = useState(0);
    const [payrollHistory,setPayrollHistory] = useState([]);
    const [requestList,setRequestList] = useState([]);
    const [requestModal,setRequestModal] = useState(false);
    const [employeesTimesheet,setEmployeesTimesheet] = useState([]);
    const [employeesTimesheetModal,setEmployeesTimesheetModal] = useState(0);
    const [paymentSchedule,setPaymentSchedule] = useState('');
    const [scheduleModal,setScheduleModal] = useState('');
    const [rateModal,setRateModal] = useState(false);
    const [organizationRateModal,setOrganizationRateModal] = useState(false);
    const [rate,setRate] = useState('');
    const [client,setClient] = useState('');
    const [clientId,setClientId] = useState('');
    const [employeeId,setEmployeeId] = useState('');
    const [scheduleType,setScheduleType] = useState('');
    const [invoiceList,setInvoiceList] = useState([]);
    const [paidModal,setPaidModal] = useState(0);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    const [loading5, setLoading5] = useState(true);
    const [loading6, setLoading6] = useState(true);
    const [loading7, setLoading7] = useState(true);
    const [reportList,setReportList] = useState([]);
    const [currentLocation,setCurrentLocation] = useState({lat:null,lng:null});
    const [previousLocation,setPreviousLocation] = useState(null);
    const [distance,setDistance] = useState(0);
    const [tracking,setTracking] = useState(false);
    const [watchId,setWatchId] = useState(null);
    const [error,setError] = useState(null);
   


    const togglePaidModal = (index)=>{
        setPaidModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    }
    const toggleScheduleModal = ()=>{
        setScheduleModal(!scheduleModal);
    }
    const toggleOrganizationModal = ()=>{
        setErrorMessage('');
        setOrganizationRateModal(!organizationRateModal);
    }
    const toggleRateModal = (client,hourly_rate,clientId,userId)=>{
        setClient(client);
        setRate(hourly_rate);
        setClientId(clientId);
        setEmployeeId(userId);
        
        setRateModal(!rateModal);
    }
    const closeRateModal = ()=>{
        setClient('');
        setRate('');
        setClientId('');
        setEmployeeId('');
        setErrorMessage('');
        setRateModal(!rateModal);
    }
    
    const toggleTimeSheetModal = ()=>{
        setErrorMessage('');
        setTimesheetModal(!timesheetModal);
    };
    const toggleEmployeesTimesheetModal = (index) => {
        setEmployeesTimesheetModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const handleTimeSheet = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        
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
                setsnackbarStatus('success');
                setShowSnackbar(true);
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setShowSnackbar(false);
                    
                    
                    setEndingDate('');
                    setTaskName('');
                    setHoursWorked('');
                    setActivityDescription('');
                    setTimesheetModal(!timesheetModal);
                    fetchTimeSheet();
             
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
    const handleRequest = async (requestStatus,requestId) => {
        
        setShowSnackbar(false);
        
        
        try {
            const formData = new FormData();
            formData.append('status', requestStatus);
            formData.append('requestId',requestId );
            const response = await axios.post(`${apiUrl}/requests-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                 setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.log('an error occurred');
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                //setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
            // Handle unexpected errors
        }
    };

    const handlePaid = async (status,Id) => {
        
        
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('Id',Id );
            const response = await axios.post(`${apiUrl}/pay-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchInvoiceList();
                   fetchPayrollHistory();
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
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

    const handleEmployeeTimesheet = async (status,timesheetId) => {
        setShowSnackbar(false);
        
        
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('timesheetId',timesheetId );
            const response = await axios.post(`${apiUrl}/employees-timesheet-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchEmployeesTimeSheet();
                   
                   //fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
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
    const handlePaymentSchedule = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        try {
            const formData = new FormData();
            formData.append('organizationId',Id );
            formData.append('payment_schedule',scheduleType );

            const response = await axios.post(`${apiUrl}/set-payment-schedule/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            fetchEmployeesTimeSheet();
    
            if (response.data.success) {
                
                setTimeout(() => {
                   console.log('success');
                   fetchPaymentSchedule();
                   setIsLoading(isLoading);
                   setScheduleModal(!scheduleModal);
                   //fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                 setShowSnackbar(true);
                
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                 setShowSnackbar(true);
                setIsLoading(isLoading);
                console.log('an error occurred');
                setErrorMessage('An error occurred.');
                
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setIsLoading(!isLoading);
            
            // Handle unexpected errors
        }
    };
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleStatusModal = (index) => {
        setStatusModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleRequestModal = (index) => {
        setRequestModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleRemoveEmployeeModal = (Id,name,action)=>{
        setActionType(action);
        setEmployeeId(Id);
        setEmployeeName(name);
        setErrorMessage('');
        setRemoveEmployeeModal(!removeEmployeeModal);
    };
    const closeRemoveEmployeeModal = ()=>{
        setActionType('');
        setEmployeeId('');
        setEmployeeName('');
        setRemoveEmployeeModal(!removeEmployeeModal);
    };
    const toggleMemberModal = (Id,name)=>{
        setEmployeeId(Id);
        setEmployeeName(name);
        setMemberModal(!memberModal);
    };
    const closeMemberModal = ()=>{
        setEmployeeId('');
        setEmployeeName('');
        setMemberModal(!memberModal);
    };
    const handleDepartmentChange = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('department', department);
            const response = await axios.put(`${apiUrl}/membership-department/${employeeId}/change/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setDepartment('');
                    setEmployeeName('');
                    setEmployeeId('');
                    setMemberModal(!memberModal);
                    fetchEmployees();
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };

    const handleClientRate = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('clientId', clientId);
            formData.append('employeeId', employeeId);
            formData.append('organizationId', Id);
            formData.append('hourly_rate', rate);
            const response = await axios.put(`${apiUrl}/client-rate-update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setClient('');
                    setClientId('');
                    setRate('');
                    setRateModal(!rateModal);
                    fetchEmployeesTimeSheet();
                    setsnackbarStatus('success');
                    setShowSnackbar(true);
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('an error occurred.');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleOrganizationRate = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        setErrorMessage('');
        
        try {
            const formData = new FormData();
            formData.append('organizationId', Id);
            formData.append('hourly_rate', rate);
            const response = await axios.post(`${apiUrl}/organization-rate-update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                   
                    setRate('');
                    toggleOrganizationModal();
                    fetchEmployeesTimeSheet();
                    setsnackbarStatus('success');
                    setShowSnackbar(true);
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('an error occurred.');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleEmployeeRemove = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('reason', reason);
            formData.append('status', actionType);
            const response = await axios.post(`${apiUrl}/membership-department/${employeeId}/remove/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEmployeeName('');
                    setReason('');
                    setDate('');
                    setEmployeeId('');
                    setRemoveEmployeeModal(!removeEmployeeModal);
                    fetchEmployees();
                    fetchOffboardingList();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const fetchEmployees = async () => {
        try {
          const response = await axios.get(`${apiUrl}/employees/list/${Id}/`);
          
          setEmployees(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching employees:', error.message);
        }
    };
    const fetchPaymentSchedule = async () => {
        try {
          const response = await axios.get(`${apiUrl}/check-payment-schedule/${Id}/`);
          
          setPaymentSchedule(response.data.schedule);
        } catch (error) {
          console.error('Error', error.message);
        }
    };
    const fetchOffboardingList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/off-boarding-list/${Id}/`);
          console.log(response.data);
          setOffboardingList(response.data);
          setLoading4(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading4(false);
        }
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
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchEmployeesTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/employees-timesheet/${Id}/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setEmployeesTimesheet(response.data);
          setLoading2(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading2(false);
        }
    };
    const fetchOrganizationTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/organization/time-sheet/${Id}/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
         
          setOrganizationTimeSheet(response.data.timesheets);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchOnboardingList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/on-boarding-list/${Id}/`);
          //console.log(response.data);
          setOnboardingList(response.data);
          setLoading3(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading3(false);
        }
    };
  
    const fetchPayrollHistory = async () => {
        try {
          const response = await axios.get(`${apiUrl}/payroll-history/${Id}/`);
          //console.log(response.data);
          setPayrollHistory(response.data.all_payroll);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchInvoiceList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/invoice-list/${Id}/`);
          //console.log(response.data);
          setInvoiceList(response.data.all_invoice);
          setLoading5(false);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
          setLoading5(false);
        }
    };

    const fetchOrganizationRequest = async () => {
        try {
          const response = await axios.get(`${apiUrl}/organization/requests/${Id}/`);
          console.log(response.data);
          setRequestList(response.data.all_requests);
          setLoading6(false);
        } catch (error) {
          console.error('Error fetching organization:', error.message);
          setLoading6(false);
        }
    };

    useEffect(() => {

       
        if (user=== null || user?.isEmployer === false ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        };

        const savedDistance = localStorage.getItem('distance');
        const savedTracking = localStorage.getItem('tracking');

        if(savedDistance){
            setDistance(parseFloat(savedDistance));
        };
        if(savedTracking === 'true'){
            //starttracling();
        };
        localStorage.setItem('distance',distance.toString());
        localStorage.setItem('tracking',tracking.toString());
        

        const fetchOrganization = async () => {
            try {
              const response = await axios.get(`${apiUrl}/organization/${Id}/`);
              console.log(response.data);
              setOrganization(response.data);
            } catch (error) {
              console.error('Error fetching organization:', error.message);
            }
        };
        
       
        const fetchDepartments = async () => {
            try {
              const response = await axios.get(`${apiUrl}/departments/list/`);
              setDepartments(response.data);
            } catch (error) {
              console.error('Error fetching departments:', error.message);
            }
        };
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/employer/profile/fetch/`,{
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
        const fetchReport = async () => {
            try {
                
                const response = await axios.get(`${apiUrl}/employee/report/${Id}/list/`,{
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

      
        fetchDepartments();
        fetchReport();
        fetchOnboardingList();
        fetchOffboardingList();
        fetchEmployees();
        fetchOrganization();
        fetchTimeSheet();
        fetchOrganizationTimeSheet();
        fetchPayrollHistory();
        fetchOrganizationRequest();
        fetchEmployeesTimeSheet();
        fetchPaymentSchedule();
        fetchInvoiceList();
        fetchProfileData();
       
        
        
        
    }, [Id,user,navigate,distance,tracking]);

   
    
   

    const saveDistanceToBackend = async () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
              (position) => {
                const newLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
      
                if (previousLocation) {
                  const distanceTraveled = calculateDistance(previousLocation, newLocation);
                  setDistance((prevDistance) => prevDistance + distanceTraveled);
                }
      
                setPreviousLocation(newLocation);
                setCurrentLocation(newLocation);
              },
              (error) => setError(error.message)
            );
            setWatchId(id);
            setTracking(true);
            console.log('watchId2:',watchId);
          } else {
            setError('Geolocation is not supported by this browser.');
        }
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
            setTracking(false);
            //saveDistanceToBackend(distance);
            try {
                const formData = new FormData();
                formData.append('distance', distance);
                formData.append('organization', Id);
                console.log('distance...',distance)
                await axios.post(`${apiUrl}/api/distance/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                    },
                });
               
            } catch (error) {
              console.error('Error saving distance to backend:', error);
            }
        }else{
            console.log('null');
        };
        
    };
      
    
    const calculateDistance = (loc1, loc2) => {
        const toRad = (value) => (value * Math.PI) / 180;
    
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRad(loc2.lat - loc1.lat);
        const dLng = toRad(loc2.lng - loc1.lng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log('R * c:',R * c);
        return R * c;
    };
    

    const handleHourlyRateChange = async (employeeId, hourlyRate) => {
        try {
          const response = await axios.post(`${apiUrl}/calculate_salary/${employeeId}/`, {
            hourly_rate: hourlyRate,
          });
      
          // Assuming the response includes calculated salary, update the state or display it as needed
          const updatedOrganizationTimeSheet = organizationTimeSheet.map(employee => {
            if (employee.employeeId === employeeId) {
              return { ...employee, salary: response.data.salary };
            }
            return employee;
          });
          const updatedPayRoll = organizationTimeSheet.map(employee => {
            if (employee.employeeId === employeeId) {
              return { ...employee, salary: response.data.salary,hourly_rate:response.data.hourly_rate };
            }
            return employee;
          });
      
          setOrganizationTimeSheet(updatedOrganizationTimeSheet);
          setPayrollData(updatedPayRoll);
      
          // Calculate total salary based on the updated organizationTimeSheet
          const total = updatedOrganizationTimeSheet.reduce((acc, employee) => {
           
            return acc + employee.salary;
          }, 0);
      
          setTotalSalary(total);
        } catch (error) {
          console.error('Failed to calculate salary:', error);
        }
      };
      const handleSubmitPayroll = async () => {
         setIsLoading(!isLoading);
         setShowSnackbar(false)
        try {
          // Assuming you have an API endpoint for submitting payroll
          const response = await axios.post(`${apiUrl}/api/submit-payroll/${Id}/`, 
          { payroll_data: payrollData, total_amount: totalSalary }
          );
          console.log(response.data);
          setTimeout(() => {

            setIsLoading(isLoading);
            toggleSlider(8);
            fetchPayrollHistory();
           
           
        }, 2000);
        setsnackbarStatus('success');
        setShowSnackbar(true);
          
          // Handle success, reset or navigate to another page, etc.
        } catch (error) {
          console.error('Failed to submit payroll:', error);
          setIsLoading(isLoading);
          setsnackbarStatus('fail');
          setShowSnackbar(false);
          // Handle error
        }
      };
   
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
                        <Link to={`/organization/${Id}/sales-funnel/`} className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Sales Funnel</span>
                        </Link>
                        <Link to='/organizations/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organization & users</span>
                        </Link>
                        <Link to='/organization/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        <Link to={`${employeeProfile.exist ? '/employer/profile/' : '/employer/profile/create'}`} className = 'card'>
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
                        <div className='box2'>
                            <div className={`tabs ${openSlideSections === 0 ? 'active' :''}`} onClick={() => toggleSlider(0)}>Employees</div>
                           
                            <div className={`tabs ${openSlideSections === 2 ? 'active' :''}`} onClick={() => toggleSlider(2)}>Employee TimeSheet</div>
                            <div className={`tabs ${openSlideSections === 7 ? 'active' :''}`} onClick={() => toggleSlider(7)}>GPS</div>
                            <div className={`tabs ${openSlideSections === 3 ? 'active' :''}`} onClick={() => toggleSlider(3)}>Requests</div>
                            <div className={`tabs ${openSlideSections === 6 ? 'active' :''}`} onClick={() => toggleSlider(6)}>Reportd</div>
                            <div className={`tabs ${openSlideSections === 4 ? 'active' :''}`} onClick={() => toggleSlider(4)}>Onboarding</div>
                            <div className={`tabs ${openSlideSections === 5 ? 'active' :''}`} onClick={() => toggleSlider(5)}>Offboarding</div>
                            
                           {/* <div className={`tabs ${openSlideSections === 6 ? 'active' :''}`} onClick={() => toggleSlider(6)}>Performance</div> */}
                            {/*        <div className={`tabs ${openSlideSections === 7 ? 'active' :''}`} onClick={() => toggleSlider(7)}>Payroll</div> */}
                        </div>
                       </div>
                       {openSlideSections === 0 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee List</div>
                           {loading ? (
                                   <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                           ):(
                                <>
                                  {employees.length === 0 ? (
                                       <h5>No employee data available. Click here to add employees</h5>
                                  ):(
                                    <table>
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Department</th>
                                        <th>Timesheet</th>
                                        <th>Status</th>
                                        {/* Add more columns as needed */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>#{employee.organization}{employee.id}</td>
                                            <td>{employee.first_name}</td>
                                            <td>{employee.last_name}</td>
                                            <td>{employee.department}</td>
                                            <td>
                                                <Link to = {`/employee/timesheet/${Id}/${employee.userId}/${employee.first_name}${employee.last_name}/list/`} >view timesheet</Link>
                                            </td>
                                            <td className={`status ${StatusModal === 0 ? 'show' :''}`} onClick={() => toggleStatusModal(employee.id)} >
                                                <span>{employee.status}</span>
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                                {StatusModal === employee.id && (
                                                    <div className = 'status-modal'>
                                                        {employee.status === 'Inactive' && (
                                                            <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                            
                                                        )}
                                                        {employee.status === 'Suspended' && (
                                                            <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                            
                                                        )}
                                                        <div className='card' onClick={()=>toggleMemberModal(employee.id,employee.first_name)}>Change Department</div>
                                                        <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Inactive')}>Remove employee</div>
                                                        <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Suspended')}>Suspend</div>
                                                    
                                                    </div>
                                                )}
                                                
                                            </td>
                                            {/* Add more columns as needed */}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                  )}
                                </>
                           )}
                         </div>
                       )}
                       
                        {openSlideSections === 2 && (
                        <div className='organization-body'>
                            {loading2 ? (
                               <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ):(
                                <div>
                                    {employeesTimesheet.length === 0 ? (
                                <div className = 'timesheet'>
                                <div className='body-title'>No timesheet data available. Please ensure that timesheets are being submitted correctly by your employees.</div>
                                </div>
                                    ) : (
                                        <>
                                            <div className = 'timesheet'>
                                            <div className='body-title'>Employee TimeSheet</div>
                                            {organization.organization_type !== 'HEALTH' ? (
                                                <div className='time-btn' onClick={toggleOrganizationModal}>
                                                Set rate
                                                </div>
                                            ):(
                                                <div></div>
                                            )}
                                            </div>
                                            {organization.organization_type === 'HEALTH' ? (
                                                <table>
                                                <thead>
                                                    <tr>
                                                    
                                                    <th>Start Date</th>
                                                    <th>End date</th>
                                                    <th>Name</th>
                                                    <th>Organization</th>
                                                    <th>Client</th>
                                                    <th>Hourly rate</th>
                                                    <th>Total hours</th>
                                                    <th>Bill</th>
                                                    <th>Client approved</th>
                                                    <th>Approve</th>
                                                    <th>Detail</th>
                                                    {/* Add more columns as needed */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employeesTimesheet.map((employee) => (
                                                    <tr key={employee.id}>
                                                    
                                                        <td>{employee.start_date}</td>
                                                        <td>{employee.end_date}</td>
                                                        <td>{employee.user}</td>
                                                        <td>{employee.organization}</td>
                                                        <td>
                                                            {employee.client ? (
                                                                <>{employee.client}</>
                                                            ):(
                                                                <>No client assigned</>
                                                            )}
                                                        </td>
                                                            
                                                        <td className='ta'>
                                                            £{employee.hourly_rate}/hr
                                                           
                                                            
                                                        
                                                            <i class="fa-solid fa-pen-to-square" style={{marginLeft:'2px'}} onClick={()=>toggleRateModal(employee.client,employee.hourly_rate,employee.clientId,employee.userId)}></i>
                                                        </td>
                                                        <td className='table-description'>{employee.hours_worked}</td>
                                                        <td >£{employee.bill}</td>
                                                        <td>
                                                            
                                                            {employee.client ? (
                                                                <>{employee.client_approved}</>
                                                            ):(
                                                                <>No client assigned</>
                                                            )}
                                                        </td>
                                                        <td className={`status ${employeesTimesheetModal === 0 ? 'show' :''}`} onClick={() => toggleEmployeesTimesheetModal(employee.id)} >
                                                            <span>{employee.organization_approved}</span>
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
                                                        <td><Link to ={`/employee/timesheet/detail/${employee.id}/${employee.userId}/${employee.user}/`}>view</Link></td>
                                                        
                                                    
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            ) :(
                                                <table>
                                                <thead>
                                                    <tr>
                                                    
                                                    <th>Start Date</th>
                                                    <th>End date</th>
                                                    <th>Name</th>
                                                    <th>Organization</th>
                                                
                                                    <th>Hourly Rate</th>
                                                    <th>Total hours</th>
                                                    <th>Bill</th>
                                                    
                                                    <th>Approve</th>
                                                    <th>Detail</th>
                                                    {/* Add more columns as needed */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employeesTimesheet.map((employee) => (
                                                    <tr key={employee.id}>
                                                    
                                                        <td>{employee.start_date}</td>
                                                        <td>{employee.end_date}</td>
                                                        <td>{employee.user}</td>
                                                        <td>{employee.organization}</td>
                                                    
                                                        
                                                        
                                                        <td >
                                                            £{employee.hourly_rate}
                                                            <i class="fa-solid fa-pen-to-square" style={{marginLeft:'2px'}} onClick={toggleOrganizationModal}></i>
                                                        </td>
                                                        <td className='table-description'>{employee.hours_worked}</td>
                                                        <td className='table-description'> £{employee.bill}</td>

                                                        <td className={`status ${employeesTimesheetModal === 0 ? 'show' :''}`} onClick={() => toggleEmployeesTimesheetModal(employee.id)} >
                                                            <span>{employee.organization_approved}</span>
                                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                                            {employeesTimesheetModal === employee.id && (
                                                                <div className = 'status-modal'>
                                                                
                                                                    {employee.organization_approved === 'Approved' && (
                                                                        <div className='card' onClick={()=>handleEmployeeTimesheet('Rejected',employee.id)}>Reject</div>
                                                                    )}
                                                                
                                                                
                                                                    
                                                                    {(employee.organization_approved === 'Pending' || employee.organization_approved === 'Rejected' || employee.organization_approved === 'Under Review') && (
                                                                        <div className='card' onClick={()=>handleEmployeeTimesheet('Approved',employee.id)}>Approve</div> 
                                                                    )}
                                                                
                                                                
                                                                
                                                                </div>
                                                            )}
                                                            
                                                            
                                                        </td>
                                                        <td><Link to ={`/employee/timesheet/detail/${employee.id}/${employee.userId}/${employee.user}/`}>view</Link></td>
                                                        
                                                    
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                            
                         </div>
                       )}
                       {openSlideSections === 3 && (
                         <div className='organization-body'>
                            {loading6 ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                            ):(
                                <>
                                    {requestList.length === 0 ? (
                                        <div className='body-title'>No employee requests available at this moment. Please check back later</div>
                           ) : (
                            <>
                                <div className='body-title'>Employee Requests</div>
                                 <table>
                                <thead>
                                    <tr>
                                    <th>Employee</th>
                                    <th>Organization</th>
                                    <th>Request type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.user}</td>
                                        <td>#{employee.organization}</td>
                                        <td>{employee.request_type}</td>
                                        <td>{employee.start_date}</td>
                                        <td>{employee.end_date}</td>
                                        
                                        {/* Add more columns as needed */}
                                        <td className={`status ${requestModal === 0 ? 'show' :''}`} onClick={() => toggleRequestModal(employee.id)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {requestModal === employee.id && (
                                                <div className = 'status-modal'>
                                                   
                                                    {employee.status === 'Approved' && (
                                                        <div className='card' onClick={()=>handleRequest('Rejected',employee.id)}>Reject</div>
                                                    )}
                                                   
                                                    {employee.status !== 'Under Review' && (
                                                        <div className='card' onClick={()=>handleRequest('Under Review',employee.id)}>Under Review</div> 
                                                    )}
                                                     {employee.status !== 'Rejected' && (
                                                        <div className='card' onClick={()=>handleRequest('Rejected',employee.id)}>Reject</div> 
                                                    )}
                                                    {(employee.status === 'Pending' || employee.status === 'Rejected' || employee.status === 'Under Review') && (
                                                        <div className='card' onClick={()=>handleRequest('Approved',employee.id)}>Approve</div> 
                                                    )}
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </>
                           )}
                                </>
                            )}
                           
                         </div>
                       )}
                        {openSlideSections === 4 && (
                         <div className='organization-body'>
                            
                            {loading3 ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                            ):(
                                <>
                                    {onboardingList.length === 0 ? (
                                <div className='body-title'>No data available.</div>
                            ) : (
                                <>
                                    <div className='body-title'>Invite List</div>
                                    <table>
                                        <thead>
                                            <tr>
                                            <th>ID</th>
                                            <th>invited_by</th>
                                            <th>invited_user</th>
                                            
                                            <th>Department</th>
                                            <th>Status</th>
                                            {/* Add more columns as needed */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {onboardingList.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>#{employee.organization}{employee.id}</td>
                                                <td>{employee.invited_by}</td>
                                                <td>{employee.invited_user}</td>
                                                <td>{employee.department}</td>
                                                <td className={`status}`} onClick={() => toggleStatusModal(employee.id)} >
                                                    <span>{employee.status}</span>
                                                
                                                    
                                                </td>
                                                {/* Add more columns as needed */}
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                                </>
                            )}
                         </div>
                       )}
                       {openSlideSections === 5 && (
                         <div className='organization-body'>
                           {loading4 ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                           ):(
                                <>
                                     {offboardingList.length === 0 ? (
                                <div className='body-title'>No data available.</div>
                            ):(
                                <>
                                    <div className='body-title'>offboarding List</div>
                                    <table>
                                        <thead>
                                            <tr>
                                            <th>ID</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Department</th>
                                            <th>Status</th>
                                            {/* Add more columns as needed */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {offboardingList.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>#{employee.organization}{employee.id}</td>
                                                <td>{employee.first_name}</td>
                                                <td>{employee.last_name}</td>
                                                <td>{employee.department}</td>
                                                <td className={`status ${StatusModal === 0 ? 'show' :''}`} onClick={() => toggleStatusModal(employee.id)} >
                                                    <span>{employee.status}</span>
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    {StatusModal === employee.id && (
                                                        <div className = 'status-modal'>
                                                            {employee.status === 'Inactive' && (
                                                                <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                                
                                                            )}
                                                        
                                                        </div>
                                                    )}
                                                    
                                                </td>
                                                {/* Add more columns as needed */}
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                                </>
                           )}
                            
                         </div>
                       )}
                        {openSlideSections === 6 && (
                         <div className='organization-body'>
                            {loading6 ? (
                                <>
                                    <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                                </>
                            ):(
                                <>
                                    {reportList.length === 0 ? (
                                        <div className='body-title'>No employee reports available at this moment. Please check back later</div>
                           ) : (
                            <>
                                <div className='body-title'>Employee Reports</div>
                                 <table>
                                <thead>
                                    <tr>
                                    <th>Employee</th>
                                    <th>Organization</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Content</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.user}</td>
                                        <td>#{employee.organization}</td>
                                        <td>{employee.title}</td>
                                        <td>{employee.date}</td>
                                        <td>{employee.content}</td>
                                        
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </>
                           )}
                                </>
                            )}
                           
                         </div>
                       )}
                        {openSlideSections === 7 && (
                         <div className='organization-body'>
                            <div className = 'timesheet'>
                                <div className='body-title'> GPS Distance Tracker.</div>
                                <div className='time-btn'>
                                    <button onClick={saveDistanceToBackend }>
                                        {tracking ? 'Stop Tracking' : 'Start Tracking'}
                                    </button>
                                </div>
                                
                            </div>
                            <div>
                                {currentLocation.lat && currentLocation.lng ? (
                                        <p>
                                        Current Location - Latitude: {currentLocation.lat}, Longitude: {currentLocation.lng}
                                        </p>
                                    ) : (
                                        <p>{error || 'Waiting for location...'}</p>
                                )}
                                <p>Total Distance Traveled: {distance.toFixed(2)} km</p>
                            </div>
                           
                           
                         </div>
                       )}
                      {/* {openSlideSections === 7 && (
                            <div className='organization-body'>
                                <div className='body-title-wrapper'>
                                    <div className='schedule-title'>
                                        <span>Payment Schedule:{paymentSchedule}</span>
                                        <i onClick={ toggleScheduleModal } class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                   <div className='invoice-wrapper'>
                                        <div className={`tabs ${openSlideSections === 8 ? 'active' :''}`} onClick={() => toggleSlider(8)}>Payroll history</div>
                                        <div className={`tabs ${openSlideSections === 9 ? 'active' :''}`} onClick={() => toggleSlider(9)}>Total invoice</div>
                                    </div>
                                </div>
                            
                            <table>
                              <thead>
                                <tr>
                                  <th>Employee name</th>
                                  <th>Department</th>
                                  <th>Rate/hr</th>
                                  <th>hours worked</th>
                                  <th>total salary</th>
                                </tr>
                              </thead>
                              <tbody>
                                {organizationTimeSheet.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.user}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                      <input
                                        type='number'
                                        placeholder=' e.g $20.2/hr'
                                        onChange={(e) => handleHourlyRateChange(employee.employeeId, e.target.value)}
                                      />
                                    </td>
                                    <td>{employee.hours_worked}</td>
                                    <td>
                                     ${employee.salary}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className='total-salary'>
                            Total Salary: {totalSalary}
                             
                            </div>
                            <div className='submit-payroll-wrapper'>
                               
                                <div className = 'btn' onClick={handleSubmitPayroll}>
                                     Submit Payroll
                                     {isLoading ? <div className="loader"></div> : '' }
                                </div>
                            </div>
                          </div>
                       )} */}
                      {/* {openSlideSections === 8 && (
                        <div className='organization-body'>
                        <div className='body-title'>Payroll list</div>
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
                                    <td className={`status ${paidModal === 0 ? 'show' :''}`} onClick={() => togglePaidModal(employee.payId)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {paidModal === employee.payId && (
                                                <div className = 'status-modal'>
                                                     <div className='card' onClick={()=>handlePaid('Paid',employee.payId)}>Paid</div>
                                                     <div className='card' onClick={()=>handlePaid('Pending',employee.payId)}>Pending</div>
                                                     <div className='card' onClick={()=>handlePaid('Cancelled',employee.payId)}>Cancelled</div>
                                                   
                                                   
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                       
                      </div>
                        )} */}
                        {/* {openSlideSections === 9 && (
                        <div className='organization-body'>
                        <div className='body-title'>Total invoice</div>
                        <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Organization</th>
                                  <th>total amount</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {invoiceList.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.date}</td>
                                   
                                    <td>
                                     {employee.organization}
                                    </td>
                                    <td>
                                     ${employee.salary_amount}
                                    </td>
                                   
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                       
                      </div>
                        )} */}
                      
                    </div>
                </div>
            </div>

            <form className={`organization-form ${memberModal ? 'show-member' : ''}`} onSubmit ={handleDepartmentChange}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Employee deparment</div>
                        <div className='icon' onClick={closeMemberModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group`}>
                           <p>Are you sure you want to change {employeeName}'s department?</p>
                        </div>
                        <div className={`form-group`}>
                            <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                                <option value="" disabled>Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.id}>{dep.title}</option>
                                ))}
                            </select>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${removeEmployeeModal ? 'remove-member' : ''}`} onSubmit = {handleEmployeeRemove } >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Employee deparment</div>
                        <div className='icon' onClick={closeRemoveEmployeeModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group`}>
                           {actionType === 'Inactive' &&(
                            <p>Are you sure you want to remove {employeeName}'s from your team?</p>
                           )}
                            {actionType === 'Active' &&(
                             <p>Are you sure you want to reinstate {employeeName} to your team?</p>
                           )}
                           {actionType === 'Suspended' &&(
                            <p>Are you sure you want to suspend {employeeName}?</p>
                           )}
                        </div>
                        <div className={`form-group ${reason ? 'active' : ''}`}>
                            <textarea id="reason" value={reason} onChange = {(event)=>setReason(event.target.value)} required></textarea>
                          
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className={`form-group ${date ? 'active' : ''}`}>
                            <div className='date'>Start date:</div>
                            <input type='date' value={date} onChange = {(event)=>setDate(event.target.value)} required />
                          
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
            <form className={`organization-form ${timesheetModal ? 'timesheet-modal' : ''}`} onSubmit = {handleTimeSheet} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create timesheet</div>
                        <div className='icon' onClick={toggleTimeSheetModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${taskName ? 'active' : ''}`}>
                            <input id='task-name' type='text' value={taskName} onChange = {(event)=>setTaskName(event.target.value)} required />
                            <label htmlFor="task-name">Task name</label>
                        </div>
                        <div className={`form-group ${ activityDescription ? 'active' : ''}`}>
                            <textarea id="activity-description" value={activityDescription} onChange = {(event)=>setActivityDescription(event.target.value)} required></textarea>
                          
                            <label htmlFor="activity-description">Activity description</label>
                        </div>
                        <div className={`form-group ${hoursWorked ? 'active' : ''}`}>
                            <input id='hours-worked'  type='number' value={hoursWorked} onChange = {(event)=>setHoursWorked(event.target.value)} required />
                            <label htmlFor="hours-worked">hours worked</label>
                        </div>
                        <div className={`form-group ${endingDate ? 'active' : ''}`}>
                            <div className='date'>Date:</div>
                            <input id='ending-date'  type='datetime-local' value={endingDate} onChange = {(event)=>setEndingDate(event.target.value)} required />
                           
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

            <form className={`organization-form ${scheduleModal ? 'show-member' : ''}`} onSubmit ={handlePaymentSchedule}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Set Payment Schedule</div>
                        <div className='icon' onClick={toggleScheduleModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group`}>
                            <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value)} required>
                                <option value="" disabled>Select Payment schedule</option>
                                <option  value='Monthly'>Monthly</option>
                                <option  value='Bi-Weekly'>Bi-Weekly</option>
                                <option  value='Weekly'>Weekly</option>
                            </select>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${rateModal ? 'show-member' : ''}`} onSubmit ={handleClientRate}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Set rate</div>
                        <div className='icon' onClick={closeRateModal }>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group`}>
                            <div className='client' ></div>
                        </div>
                        <div className={`form-group ${rate ? 'active' : ''}`}>
                            <input id='hours-worked'  type='number' value={rate} onChange = {(event)=>setRate(event.target.value)} required />
                            <label htmlFor="hours-worked">Rate</label>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${organizationRateModal ? 'show-member' : ''}`} onSubmit ={handleOrganizationRate}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Set rate</div>
                        <div className='icon' onClick={toggleOrganizationModal }>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group`}>
                            <div className='client' >{organization.name}</div>
                        </div>
                        <div className={`form-group ${rate ? 'active' : ''}`}>
                            <input id='rate'  type='number' value={rate} onChange = {(event)=>setRate(event.target.value)} required />
                            <label htmlFor="rate">Rate</label>
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                submit
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

export default OrganizationDashboard;