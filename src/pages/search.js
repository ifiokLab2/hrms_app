import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate,useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/organizations.css';
import '../styles/elearning.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import DesktopLogout from './desktop-logout';
//import hero1 from '../styles/hero1.jpg';

const Search = ()=>{
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [term, setTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.user);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        navigate(`/search?query=${searchQuery}`);
    };
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
       
    };

  
   
   
   
    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`${apiUrl}/api/search-courses/?query=${query}`);
            setLoading(!loading);
            setResults(response.data.all_courses);
            
            
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('query');
        setTerm(searchQuery);
        if (searchQuery) {
            // Perform the search based on the query
            fetchSearchResults(searchQuery);
        }
       
    
       
        
    }, [location.search]);
    
   
    

  
    
   

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
                        <Link to='/organization/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        <Link className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings</span>
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
                    <div className='course-wrapper'>
                        <div className ='laptop-nav-wrapper'>
                            <div className='category-tab'>
                                <div className='title'>Categories</div>
                                <div className='category-menu'>
                                    <div className='category-section'>
                                        <Link to='/search?query=Development' className='link-tab'>
                                            <div className='text'>Development</div>
                                            <div className='icon'>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        
                                        </Link>
                                        <div className='sub-category' >
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Web Development' className='link-tab'>
                                                    <div className='text'>Web Development</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Mobile App Development' className='link-tab'>
                                                    <div className='text'>Mobile App Development</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Data Science' className='link-tab'>
                                                    <div className='text'>Data Science</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Web Development' className='link-tab'>
                                                    <div className='text'>Web Development</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Programming Languages' className='link-tab'>
                                                    <div className='text'>Programming Languages</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Database design & Game Development' className='link-tab'>
                                                    <div className='text'>Database design & Game Development</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Software Testing' className='link-tab'>
                                                    <div className='text'>Software Testing</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Software Engineering' className='link-tab'>
                                                    <div className='text'>Software Engineering</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Programming Languages' className='link-tab'>
                                                    <div className='text'>Programming Languages</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=Software Development Tools' className='link-tab'>
                                                    <div className='text'>Software Development Tools</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=No-Code Development' className='link-tab'>
                                                    <div className='text'>No-Code Development</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='category-section'>
                                        <Link to='/search?query=Finance & Accounting' className='link-tab'>
                                            <div className='text'>Finance & Accounting</div>
                                            <div className='icon'>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        
                                        </Link>
                                        <div className='sub-category' >
                                            <div className='sub-category-section'>
                                                <Link to='/search?query=>Accounting & Bookkeeping' className='link-tab'>
                                                    <div className='text'>Accounting & Bookkeeping</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Compliance</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Cryptocurrency & Blockchain</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Economics</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Finance</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Financial modeling & analysis</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Investing & trading</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Money Management tools</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Taxes</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                        
                                            
                                        </div>
                                    </div>
                                    <div className='category-section'>
                                        <Link to='' className='link-tab'>
                                            <div className='text'>IT Certification</div>
                                            <div className='icon'>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        
                                        </Link>
                                        <div className='sub-category' >
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Network & Security</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Hardware</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Operating systems & Servers</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Other IT & Softwares</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className='category-section'>
                                        <Link to='' className='link-tab'>
                                            <div className='text'>Business</div>
                                            <div className='icon'>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        
                                        </Link>
                                        <div className='sub-category' >
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Enterpreneurship</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Communication</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Management</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Sales</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Business Strategy</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Operations</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Project Management</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Software Engineering</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Business Law</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Business Law</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Business analytics and intelligence</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='category-section'>
                                        <Link to='' className='link-tab'>
                                            <div className='text'>Office Productivity</div>
                                            <div className='icon'>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        
                                        </Link>
                                        <div className='sub-category' >
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Excel</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Microsoft Office</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Excel VBA</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Microsoft Power Bi</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Google Sheets</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Google Drive</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Google Workspace</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            <div className='sub-category-section'>
                                                <Link to='' className='link-tab'>
                                                    <div className='text'>Power Point</div>
                                                    <div className='icon'>
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                    </div>
                                            
                                                </Link>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>

                                </div>
                            
                            </div>
                            <form className='search-container' onSubmit={handleSubmit}>
                                <input 
                                    type='text'
                                    placeholder = 'Search for anything' 
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </form>
                        </div>
                        <div className='popular'>
                            <h2>Showing results for "{term}"</h2>
                        </div>
               
                        <div className='course-container'>
                           {loading ? (
                                <p>Loading....</p>
                           ) : (
                                <>
                                     {results.map((course) => (
                                        <Link key={course.id} to={`/course-detail/${course.id}/${course.title}/`} className='card'>
                                            <img src ={`${apiUrl}${course.thumbnail}`} alt='' />

                                            {course.is_enrolled ? (
                                                <div className = 'heart-button enrolled'>enrolled</div>
                                                )
                                                :
                                                (
                                                    ''
                                                )
                                            }
                                            
                                            
                                            <div className='card-details'>
                                                <h2>{course.title}</h2>
                                                <div className='author-name'>{course.overview}</div>
                                                <div className='ratings-card'>
                                                    <span className='num box'>4.5</span>
                                                    <span className='stars box'>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star-half"></i>
                                                    </span>
                                                    <span className='students box'>
                                                        
                                                    </span>
                                                </div>
                                                <div className='price-card'>
                                                <span className='price'></span>
                                                <span className='discount'></span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </>
                           )}
                            
                        </div>
                  
                     </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Search;