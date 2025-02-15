import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '../styles/course-detail.css';
import previewImage from '../images/logo192.png';
import Header from '../components/header';
import apiUrl from '../components/api-url';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = ()=>{
    const [openSections, setOpenSections] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const { id } = useParams();
    const { title } = useParams();
    const [course, setCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [requirements, setRequirements] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [contentCount,setContentCount] = useState([]);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [teamModal, setTeamModal] = useState(false);
    const [organisationsList, setOrganizationList] = useState([]);
    const [organisation, setOrganization] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [snackbarStatus, setsnackbarStatus] = useState('success');
    const [showSnackbar, setShowSnackbar] = useState(false);
  
    const toggleTeamForm = ()=>{
        setTeamModal(!teamModal);
    }
    const handlePlayButtonClick = () => {
        // Update state to show the video modal
        setShowVideoModal(true);
    };
    const toggleAccordion = (index) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };
    const fetchRequirements = async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/courses/${id}/add-requirements/`);
            setRequirements(response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchObjectives = async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/courses/${id}/add-objectives/`);
            setObjectives(response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchContentCounts = async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/api/course/${id}/content-type-count/`);
            setContentCount(response.data);
            console.log('contentCount:',response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchCourseDetail = async () => {
        try {
          const response = await axios.get(`${apiUrl}/courses/${id}/`);
          setCourse(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching course details:', error);
          setLoading(false);
        }
    };
    
    const fetchCourseSections = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/sections/${id}/`);
            console.log(response.data);
            setSections(response.data);
            setOpenSections(new Array(response.data).fill(false));
        } catch (error) {
            console.error('Error fetching course sections:', error);
        }
    };
    const checkEnrollment = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/check-organization-enrollment/${id}/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
         
          setEnrolled(response.data.enrolled);
        } catch (error) {
            setEnrolled(enrolled);
          console.error('Error checking enrollment:', error);
        }
    };

    const fetchOrganizations = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/organizations/list/course/${id}`,{
            headers: {
                'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
            },
        });
            setOrganizationList(response.data.all_organization);
        } catch (error) {
          console.error('Error fetching organizations:', error.message);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        
        
        try {
            const formData = new FormData();
            formData.append('organisation', organisation);
           
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/api/enroll-organization/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            
            console.log('response.data:',response.data);
            if (response.data.success) { 
                checkEnrollment();
                setShowSnackbar(true);
                setsnackbarStatus('success');
                setTimeout(() => {
                    setIsLoading(isLoading);
                    toggleTeamForm(!teamModal);
                    
                    setShowSnackbar(false);
                   
                   
                }, 2000);
                
                //console.log('Course created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(true);
                setsnackbarStatus('fail');
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setErrorMessage(response.data.message);
                    
                    setShowSnackbar(false);
                   
                   
                }, 2000);
               
               
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
               
            }, 2000);
            // Handle unexpected errors
        }
    };
   
    
    useEffect(() => {

        
        checkEnrollment();
        fetchContentCounts();
        fetchObjectives();
        fetchRequirements();
        fetchCourseDetail();
        fetchCourseSections();
        fetchOrganizations();
    }, [id])
    const getIconForContentType = (contentType) => {
        switch (contentType) {
          case 'video':
            return 'fa-video';
          case 'audio':
            return 'fa-volume-up';
          case 'document':
            return 'fa-file-alt';
          case 'quiz':
            return 'fa-question-circle';
          case 'assignment':
            return 'fa-clipboard';
          // Add more cases as needed
          default:
            return 'fa-file'; // Default icon
        }
    };

    const getTextForContentType = (contentType,count) => {
        switch (contentType) {
          case 'video':
            return (
                <div className='card'>
                    <i class="fa-solid fa-video"></i>
                    <span>{count}  on-demand videos</span>
                </div>
                 
            );
          case 'audio':
            return (
                <div className='card'>
                    <i class="fa-solid fa-volume-up"></i>
                    <span>{count} Audio</span>
                 </div>
               
            );
          case 'document':
            return (
                <div className='card'>
                    <i class="fa-solid fa-file-alt"></i>
                    <span>{count} document</span>
                 </div>
               
            );
          case 'quiz':
            return (
                <div className='card'>
                    <i class="fa-solid fa-question-circle"></i>
                    <span>{count} Quiz</span>
                 </div>
               
            );
          case 'assignment':
            return (
                <div className='card'>
                    <i class="fa-regular fa-clipboard"></i>
                    <span>{count} Assignments</span>
                 </div>
            );
          default:
            return '';
        }
      };

   

    return(
        <div className='page-wrapper'>
             <Header />
            <div className='landing-page-wrapper'>
                {course && (
                     <div className='landing-page-container'>
                    
                     <div className='container1'>
                         <h1 className='course-title'>{course.title}</h1>
                         <div className='course-description'>
                           {course.overview}
                         </div>
                         <div className='ratings-container'>
                             <div className='ratings-box'>
                                 <span className='ratings-num'>4.7</span>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star-half"></i>
                                 <span className='student-num'></span>
                             </div>
                         </div>
                         <div className='author-card'>
                             <span className='name'>{course.instructor} </span>
                         </div>
                     </div>
                     <div className='container2'>
                         <div className = 'preview-container'>
                             <img src={`${apiUrl}${course.thumbnail}`} alt = 'preview image' />
                             <div className='image-overlay'  onClick={handlePlayButtonClick}>
                                 <div className='wrapper'>
                                     <div className='btn-wraper'>
                                        {/*if a user clicks the play button the preview-video-wrapper nodal should be displayed and the video should start playing */}
                                        <i className="fa-solid fa-play" onClick={handlePlayButtonClick}></i>
                                     </div>
                                     <div className='preview-text'>Preview this course</div>
                                 </div>
                             </div>
                             <div className='preview-course'>
                                 
                                 <div className='cart-wrapper'>
                                     
                                        {enrolled ? (
                                            <div className='cart-btn'>
                                            <Link to={`/course-view-page/${id}/${title}/`}>Go to Course</Link>
                                            </div>
                                            ):
                                            (
                                               ""
                                            )
                                        }
                                        
                                        
                                    
                                    
                                     
                                 </div>
                                 {enrolled ? (
                                    ""
                                 ):(
                                    <div className='buy' onClick={toggleTeamForm}>
                                        Enroll team
                                    </div>
                                 )}
                                    
                                    
                                 <div className='title'>This course includes:</div>
                                 <div>
                                    {contentCount.map((count) => (
                                        <div key={count.content_type}>
                                            {getTextForContentType(count.content_type,count.count)}
                                        </div>
                                    ))}
                                    <div className='card'>
                                     <i class="fa-solid fa-infinity"></i>
                                     <span>Full lifetime access</span>
                                 </div>
                                
                                </div>
                                
                                 
                                 
                             </div>
                         </div>
                     </div>
                 </div>
                )}
               
            </div>
            <div className='what-learn-wrapper'>
                <div className='wrapper-x'>
                    <div className='title'>What you will learn</div>
                    <div className='what-container'>
                        {objectives.map((objectives) =>(
                            <div key={objectives.id} className='cards'>
                                <i class="fa-solid fa-check"></i>
                                <div className='text'>
                                    {objectives.title}
                                </div>
                             </div>
                        ))}
                       
                        
                    </div>
                </div>
            </div>
            
            <div className="accordion-wrapper">
                <div className="wrapper-x">
                <div className="accordion-header">
                    <div className="title">Course Contents</div>
                    {/* Render course details here using the 'course' state */}
                </div>

                <div className="accordion-container">
                    {sections.map((section, index) => (
                    <div className="section-tab" key={section.id}>
                        <div className="section-header" onClick={() => toggleAccordion(index)}>
                        <div className="tab-1">
                            <i className={`fa-solid ${openSections[index] ? 'fa-minus' : 'fa-plus'}`}></i>
                            <span>{section.title}</span>
                        </div>
                        <div className="tab-2">{`${section.contents.length} lectures`}</div>
                        </div>
                        {openSections[index] && (
                        <div className="section-body">
                            {section.contents.map((content) => (
                            <div key={content.id} className="card">
                                <p>{content.title}</p>
                                <i className={`fa-solid ${getIconForContentType(content.content_type)}`}></i>
                                {/* Render other content details here */}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            <div className='requirements-container'>
                <div className='wrapper-x'>
                    <div className='title'>Requirements</div>
                     <ul>
                     
                        {requirements.map((requirement) =>(
                            <li key={requirement.id}>{requirement.title}</li>
                        ))}
                     </ul>
                </div>
            </div>
            <div className='description-container'>
                <div className='wrapper'>
                <div className='title'>Description</div>
                <div className='text'>
                {course.description}
                </div>
                </div>
            </div>
            <div className='author-container'>
                <div className='wrapper'>
                    <div className='profile-container'>
                        <div className='caption'>Instructor</div>
                        <img src={`${apiUrl}${course.instructor_picture}`} alt = 'instructor' />
                        <div className='author-details'>
                            <div className='name'>{course.instructor}</div>
                            <div className='title'>
                                {course.instructor_title}
                            </div>
                            <div className='description'>
                            {course.instructor_biography}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {showVideoModal && (
            <div className = 'preview-video-wrapper'>
                <div className='preview-container'>
                    <div className='preview-header'>
                        <span className='title-header'>Course Preview</span>
                        <span className='icon'>
                            <button onClick={() => setShowVideoModal(false)}> <i className="fa-solid fa-x"></i></button>
                        </span>
                    </div>
                    <div className = 'preview-title'>
                        <div className='title'>{course.title}</div>
                    </div>
                    <div className='video-wrapper'>
                       
                        <video controls>
                            <source src={`${apiUrl}${course.preview_video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            )}

            <form className={`organization-form ${teamModal ? 'show' : ''}`} onSubmit = {handleSubmit}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Select team to enroll</div>
                        <div className='icon' onClick={toggleTeamForm}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group`}>
                            <select value={organisation} onChange={(e) => setOrganization(e.target.value)} required>
                                <option value="" disabled>Select Organization</option>
                                {organisationsList.map(dep => (
                                    <option className='org-option' key={dep.id} value={dep.id}>
                                        {dep.name} 
                                        <span>{dep.is_enrolled}</span>
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Enroll team
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
}

export default CourseDetailPage;