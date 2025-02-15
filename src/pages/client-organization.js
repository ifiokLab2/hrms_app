import React, { useState,useEffect } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import DesktopLogout from './desktop-logout';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/instructor.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const ClientOrganization = ()=>{
    const user = useSelector((state) => state.user.user);
    const auth = useSelector(state => state.user);
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const [employees,setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [organizations,setOrganizations] = useState([]);
    const [loadOrg,setLoadOrg] = useState(false);
    const { Id,name } = useParams();
    //const [loading, setLoading] = useState(true);
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [organization,setOrganization] = useState([]);
    
    const navigate = useNavigate();
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    useEffect(() => {
        if (auth.user === null ) {
            // Redirect to the login page
            navigate('/');
            return ;
        }
        const fetchOrganization = async () => {
            try {
              const response = await axios.get(`${apiUrl}/organization/${Id}/`);
              console.log(response.data);
              setOrganization(response.data);
            } catch (error) {
              console.error('Error fetching organization:', error.message);
            }
        };
      
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/client/profile/fetch/`,{
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
        const fetchEmployees = async () => {
            try {
             
                const response = await axios.get(`${apiUrl}/clients/staff/${Id}/list/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
           
              
              setEmployees(response.data);
            } catch (error) {
              console.error('Error fetching employees:', error.message);
            }
        };
        fetchProfileData();
        fetchOrganization();
        fetchEmployees();
        
    }, [user]);


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
                        <div className='box2'>
                            <div className={`tabs ${openSlideSections === 0 ? 'active' :''}`} onClick={() => toggleSlider(0)}>Employees</div>
                            <div className={`tabs ${openSlideSections === 1 ? 'active' :''}`} onClick={() => toggleSlider(1)}>My TimeSheet</div>
                            
                        </div>
                       </div>
                       {openSlideSections === 0 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee List</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Organization</th>
                                    <th>timesheet</th>
                                    
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.organization}</td>
                                        
                                        <td className={`status `}  >
                                        <Link to = {`/staffs/timesheet/${Id}/${employee.userId}/${employee.first_name}${employee.last_name}/list/`} >view timesheet</Link>
                                            
                                            
                                        </td>
                                        {/* Add more columns as needed */}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientOrganization;