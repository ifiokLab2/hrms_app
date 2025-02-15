import React, { useState,useEffect } from 'react';
import { Link,useNavigate ,useParams} from 'react-router-dom';
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
//import hero1 from '../styles/hero1.jpg';

const CourseEdit = ()=>{
    const [previousThumbnail, setPreviousThumbnail] = useState('');
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [previousVideo, setPreviousVideo] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewVideo, setPreviewVideo] = useState('');
    const [overview, setOverview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const { id } = useParams();

    
    
  
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', selectedCategory);
            formData.append('sub_category', selectedSubcategory);
            formData.append('overview', overview);
            formData.append('thumbnail', thumbnail);
            formData.append('preview_video', previewVideo);
            console.log('previewVideo:',previewVideo);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/courses/${id}/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/instructor/dashboard/');
                   
                }, 2000);
                console.log('Course created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.error('Course creation failed:', response.data.message);
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
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
           // const reader = new FileReader();
            //reader.readAsDataURL(file);
            setThumbnail(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
   
    
    const handleOverviewChange = (event) => {
        setOverview(event.target.value);
    };
    
    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

   
      const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category') {
            handleCategoryChange(value);
        } else if (name === 'subcategory') {
            setSelectedSubcategory(value);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await axios.get(`${apiUrl}/api/subcategories/${categoryId}/`);
            setSubcategories(response.data);
            if (response.data.length > 0) {
                setSelectedSubcategory(response.data[0].id);
            } else {
                setSelectedSubcategory('');
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };
  

    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
       /* if (User.isInstructor === true ) {
            // Redirect to the login page
            navigate('/login');
            return; // Stop further execution of useEffect
        } */
    
        // Fetch categories and default subcategories
        const fetchCourseDetail = async () => {
            try {
              const response = await axios.get(`${apiUrl}/courses/${id}/`);
              //setCourse(response.data);
              console.log('response.data:',response.data);
              setTitle(response.data.title);
              setOverview(response.data.overview);
              setDescription(response.data.description);
              setPreviousThumbnail(response.data.thumbnail);
              setPreviousVideo(response.data.preview_video);
              
             
              //setLoading(false);
            } catch (error) {
              console.error('Error fetching course details:', error);
              //setLoading(false);
            }
        };
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
               // navigate('/access-denied/');
              }
            
            } catch (error) {
              //navigate('/access-denied/');
            }
          };
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get(`${apiUrl}/api/categories/`);
                setCategories(categoriesResponse.data);
    
                if (categoriesResponse.data.length > 0) {
                    const defaultCategoryId = categoriesResponse.data[0].id;
                    setSelectedCategory(defaultCategoryId);
    
                    const subcategoriesResponse = await axios.get(`${apiUrl}/api/subcategories/${defaultCategoryId}/`);
                    setSubcategories(subcategoriesResponse.data);
    
                    if (subcategoriesResponse.data.length > 0) {
                        setSelectedSubcategory(subcategoriesResponse.data[0].id);
                    } else {
                        setSelectedSubcategory('');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
        fetchCourseDetail();
        fetchData();
        fetchProfileData();
    }, [id,user, navigate]);
    
  

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
                        <div className='wrapper-form'>
                        <form className="form-container" onSubmit={handleSubmit}  >
                            <div className='form-header'>
                            <i class="fa-solid fa-chalkboard-user"></i>
                                <span>edit course</span>
                            
                            </div>
                            <div className={`form-group ${title ? 'active' : ''}`}>
                                <input type="text" id="title" value={title} onChange = {handleTitleChange} required />
                                <label htmlFor="title">Title</label>
                            </div>
                           

                            <div className={`form-group ${categories ? 'active' : ''}`}>
                                <label htmlFor="category">Category</label>
                                <select id="category" name="category" onChange={handleInputChange} required>
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={`form-group ${subcategories ? 'active' : ''}`}>
                                <label htmlFor="subcategory">Sub Category</label>
                                <select id="subcategory" name="subcategory" onChange={handleInputChange} required>
                                    <option value="" disabled>Select Subcategory</option>
                                    {subcategories.map(subcategory => (
                                        <option key={subcategory.id} value={subcategory.id}>{subcategory.title}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className={`form-group ${overview ? 'active' : ''}`}>
                                <textarea  maxLength={70} value={overview} id = 'overview' onChange= {handleOverviewChange} required></textarea>
                                <label  htmlFor="overview">course verview</label>
                            </div>

                            <div className={`form-group ${description ? 'active' : ''}`}>
                                <textarea value={description} id = 'description' onChange= {handleDescriptionChange} required></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className = 'thumbnail-wrapper' >
                                <h4 className='previous'>Thumbnail</h4>
                               
                                <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                onChange={handleFileChange}
                               
                                />
                                 <div className='previous'>previous:{previousThumbnail}</div>
                            </div>
                            <div className = 'thumbnail-wrapper' >
                                <h4 className='previous'>Preview video</h4>
                                
                                <input
                                type="file"
                                id="previewVideo"
                                name="previewVideo"
                                onChange={(e) => setPreviewVideo(e.target.files[0])}
                                
                                
                                />
                                <div className='previous'>previous:{previousVideo}</div>
                                
                            </div>

                            <div className='btn-wrapper'>
                                <button type="submit">
                                    Submit
                                    {isLoading ? <div className="loader"></div> : '' }
                                        
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseEdit;