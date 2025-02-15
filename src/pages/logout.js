import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(setUser(null));
        navigate('/logout');
    };
  return (
    <div className='page-wrapper'>
       
      <div className='wrapper'>
        <h6 style={{padding:'10px'}}>Thanks for spending some quality time on the app today,<Link to='/'>Login</Link> .</h6>
      </div>
    </div>
  );
};

export default Logout;