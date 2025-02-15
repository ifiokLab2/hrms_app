import React, { useState,useEffect } from 'react';
import { Link,useNavigate,useParams  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/create-course.css';
import '../styles/instructor.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
import '../styles/course-requirements.css';
//import hero1 from '../styles/hero1.jpg';

const Requirements = ()=>{

  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const navigate = useNavigate();
  const [employeeProfile,setEmployeeProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarStatus, setsnackbarStatus] = useState('success');
  const [showSnackbar, setShowSnackbar] = useState(false);


 

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}/add-requirements/`);
      setRequirements(response.data);
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(!isLoading);
    setShowSnackbar(true);
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);

      const response = await axios.post(`${apiUrl}/courses/${id}/add-requirements/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {
        console.log('Requirement created successfully:', response.data);
        setTitle('');
        fetchRequirements();
        setTimeout(() => {
          setIsLoading(isLoading);
         
      }, 1000);
        setsnackbarStatus('success');
        setShowSnackbar(false);
      } else {
        setTimeout(() => {
          setIsLoading(isLoading);
         
      }, 1000);
        setsnackbarStatus('fail');
        setShowSnackbar(false);
        console.error('Failed to create requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement creation:', error);
    }
  };

  const handleDelete = async (requirementId) => {
    setShowSnackbar(true);
    try {
      const response = await axios.delete(`${apiUrl}/courses/${id}/requirements/${requirementId}/delete/`, {
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      console.log('response.data:',response.data);
      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} deleted successfully.`);
        fetchRequirements();
        
        setsnackbarStatus('success');
        setShowSnackbar(false);
      } else {
        
        setsnackbarStatus('fail');
        setShowSnackbar(false);
        console.error('Failed to delete requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement deletion:', error);
    }
  };

  const handleEditingData = (requirementId,title) =>{
    setEditingRequirement(requirementId);
    setNewTitle(title);
  }

  const handleEdit = async (requirementId) => {
    setShowSnackbar(true);
    

    try {
      const formData = new FormData();
      formData.append('title', newTitle);

      const response = await axios.put(`${apiUrl}/courses/${id}/requirements/${requirementId}/edit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} edited successfully.`);
        fetchRequirements();
        setEditingRequirement(null); // Reset editing state after successful edit
       
        setsnackbarStatus('success');
        setShowSnackbar(false);
      } else {
       
        setsnackbarStatus('fail');
        setShowSnackbar(false);
        console.error('Failed to edit requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement editing:', error);
    }
  };

  useEffect(() => {
    const checkCourseOwner = async () => {
      //console.log('user.auth_token:',user);
      try {
        const response = await axios.get(`${apiUrl}/api/check-course-owner/${id}/`,{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
        });
        
        if(response.data.success){
          console.log('all good');
        }else{
          //navigate('/access-denied/');
        }
      
      } catch (error) {
        //navigate('/access-denied/');
      }

    };
  
    const fetchRequirements = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses/${id}/add-requirements/`);
        setRequirements(response.data);
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/instructor/profile/fetch/`,{
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
    checkCourseOwner();
    fetchRequirements();
    fetchProfileData();
  }, [id,user,navigate]);

  
   
      
   
    


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
                        <Link to='/instructor/dashboard/' className = 'card'>
                            <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                       
                        
                       
                        <Link to={`${employeeProfile.exist ? '/instructor/profile/' : '/instructor/profile/create'}`} className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings </span>
                        </Link>
                        <Link className = 'card'>
                            <i class="fa-solid fa-headset"></i>
                            <span className = 'title'>Support</span>
                        </Link>
                    </div>
                    <div className = 'box2-wrapper' >
                        <Link className = 'card'>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span className = 'title'>Logout</span>
                        </Link>
                    </div>
                </div>
                <div className='container-2'>
                    <div className = "container-2-wrapper">
                    <div className="wrapper-form">
                            <form id="form-container-requirement" className="form-container" onSubmit={handleSubmit}>
                            <div className="section-wrapper">
                                <h2>Add course requirements</h2>
                                <input
                                type="text"
                                placeholder="e.g students should have basic IT knowledge"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                                <button type="submit" className="add-section-btn">
                                Add Section
                                {isLoading ? <div className="loader"></div> : '' }
                                </button>
                            </div>
                            </form>

                            <div className="requirements-list">
                            <h2>Course Requirements</h2>
                            <ul>
                                {requirements.map((requirement) => (
                                <li key={requirement.id}>
                                    {editingRequirement === requirement.id ? (
                                    <>
                                        <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                        <button className='save-btn' onClick={() => handleEdit(requirement.id)}>Save
                                        {isLoading ? <div className="loader"></div> : '' }
                                        </button>
                                    </>
                                    ) : (
                                    <>
                                        {requirement.title}
                                        <button className='edit-btn' onClick={() => handleEditingData(requirement.id,requirement.title)}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button className = 'delete-btn' onClick={() => handleDelete(requirement.id)}><i className="fa-solid fa-trash"></i></button>
                                    </>
                                    )}
                                </li>
                                ))}
                            </ul>
                            </div>
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

export default Requirements;