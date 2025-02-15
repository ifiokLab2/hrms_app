import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/course-overview-page.css';
import previewImage from '../images/logo192.png';
import apiUrl from '../components/api-url';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseViewPage = ()=>{
    const [openSections, setOpenSections] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const [contentOpen,setcontentOpen] = useState(true);
    //const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);
    //const [detailSections, setDetailSections] = useState([]);
    const { id } = useParams();
    const [course, setCourse] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);


 
   
    useEffect(() => {
        const checkEnrollment = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/check-enrollment/${id}/`,{
                    headers: {
                        Authorization: `Token ${user?.auth_token}`,
                    },
                });
                if(response.data.enrolled){
                    console.log('errolled');
                 }else{
                    navigate('/access-denied/');
                };
            
            } catch (error) {
                navigate('/access-denied/');
                console.error('Error checking enrollment:', error);
            }   
        };
        const fetchCourseDetail = async () => {
            try {
              const response = await axios.get(`${apiUrl}/courses/${id}/`);
              setCourse(response.data);
              //setLoading(false);
            } catch (error) {
              console.error('Error fetching course details:', error);
             // setLoading(false);
            }
        };
        const fetchDefaultContent = async () => {
            if (sections.length > 0 && sections[0].contents.length > 0) {
              const defaultContentId = sections[0].contents[0].id;
              await handleCardClick(defaultContentId);
            }
        };
        const fetchCourseSections = async () => {
            if(sections.length<=0){
                try {
                    const response = await axios.get(`${apiUrl}/api/sections/${id}/`);
                   
                    setSections(response.data);
                   
                    setOpenSections(new Array(response.data).fill(false));
                } catch (error) {
                    console.error('Error fetching course sections:', error);
                }
            }
           
        };
        
        checkEnrollment();
        fetchDefaultContent();
        fetchCourseDetail();
        fetchCourseSections();
    }, [sections,id,user,navigate]);

    const handleCardClick = async (contentId) => {
        try {
          // Fetch the specific content based on contentId
          const response = await axios.get(`${apiUrl}/api/contents/${contentId}/`);
          setSelectedContent(response.data);
        } catch (error) {
          console.error('Error fetching content details:', error);
        }
    };

    const toggleAccordion = (index) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleContent = ()=>{
        setcontentOpen(!contentOpen);
    };
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
    const getTextForContentType = (contentType,title,content,file) => {
        switch (contentType) {
          case 'video':
            return (
                <div className='content-details'>
                     <h3 className='video-title'>{title}</h3>
                    <video controls>
                        <source src={`${apiUrl}${file}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                 
            );
          case 'audio':
            return (
                <div className='content-details-card'>
                    <h3>{title}</h3>
                    <audio controls>
                        <source src={`${apiUrl}${file}`} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                 </div>
               
            );
          case 'document':
            return (
                <div className='content-details-card'>
                    <a href={`${apiUrl}${file}`} target="_blank" rel="noopener noreferrer">
                        View Document
                    </a>
                 </div>
               
            );
          case 'quiz':
            return (
                <div className='content-details-card'>
                    <h3>{title}</h3>
                   
                    <ReactQuill
                        value={content}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>
               
            );
          case 'assignment':
            return (
                <div className='content-details-card'>
                    <h3>{title}</h3>
                    
                    <ReactQuill
                        value={content}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>
            );
          default:
            return '';
        }
    };
    return(
        <div className='courseview-header' >
          
            <div className='course-header' >
                <div className='wrapper'>
                    <div className = 'back-arrow' >
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className='logo'>Elearning</div>
                    <div className='course-title'>
                       {course.title}
                    </div>
                </div>
                <div className='icon'>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className = 'course-body' >
                {/*display the click content here */}
                <div className='container-1'>
                    <div className={`content-modal ${contentOpen ? '':'show'}`} onClick = {toggleContent}>
                         <i class="fa-solid fa-chevron-left"></i>
                         <div className='text'>Course Contents</div>
                    </div>
                    <div className='body-content-wrapper'>
                        {selectedContent && (
                            <div className='ct-wrapper'>
                            {getTextForContentType(selectedContent.content_type,selectedContent.title,selectedContent.content,selectedContent.content_file)}
                            </div>
                            
                        )}
                    </div>
                </div>
                <div className={`container-2 ${contentOpen ? 'show' : ''}`}>
                    <div className='content-header'>
                        <div className='title'>Course content</div>
                        <div className='close-icon' onClick={toggleContent}>
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div className='wrapper' >
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
                            <div key={content.id} className="card-box"  onClick={() => handleCardClick(content.id)}>
                                <p>{content.title}</p>
                                <i className={`fa-solid ${getIconForContentType(content.content_type)}`}></i>
                                {/* when the user clicks on the card, the specific content should be fetch from DRF view and  displayed inside the content body */}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                    </div>
                </div>
            </div>
            <div className='course-slider'>
                <div className={`tab ${openSlideSections === 0 ? 'show' :''}`} onClick={() => toggleSlider(0)}>
                    Course Content
                </div>
                <div className={`tab ${openSlideSections === 1 ? 'show' :''}`} onClick={() => toggleSlider(1)}>
                    Annoucement
                </div>
               
            </div>
            <div className='slider-container-content'>
               {openSlideSections === 0 && (
                 <div className='slider-content'>
                    <div className='about'>
                        <div className='title'>About this course</div>
                        <div className='body'>
                           {course.overview}
                        </div>
                    </div>
                    <div className='about' >
                        <div className='title'>Description</div>
                        <div className='body'>
                            {course.description}
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
                 </div>
               )}
               {openSlideSections === 1 && (
                 <div className='slider-content'>
                    <div className='annoucement-container'>
                        <div className='profile'>
                            {/*<img src={previewImage} alt = 'preview' />*/}
                            <div className='profile-details'>
                                <div className='name'></div>
                                <div className='time'>
                                   
                                </div>
                            </div>
                        </div>
                        <div className='title'>
                           
                        </div>
                        <div className='description'>
                          
                        </div>
                    </div>
                 </div>
               )}
               {openSlideSections === 2 && (
                 <div className='slider-content'>2</div>
               )}
              
            </div>
        </div>
    );
};
export default CourseViewPage;