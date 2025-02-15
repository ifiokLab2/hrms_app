
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/error-page.css';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const NoPage = () => {
    return(
      <div className='page-wrapper'>
       
        <div className='wrapper-error'>
          <div className = 'error-page' >
             <h3>404</h3>
             <p> 
              Oops! The page you're 
              looking for is not here. 
            </p> 
           
          </div>
        </div>
    </div>
    );
  };
  
  export default NoPage;