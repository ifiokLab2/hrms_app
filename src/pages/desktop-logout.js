import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import { useSelector } from 'react-redux';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';

const DesktopLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = async () => {
        dispatch(setUser(null));
        navigate('/logout');
    };
  return (
    <div onClick={handleLogout} className = 'card'>
        <i class="fa-solid fa-right-from-bracket"></i>
        <span className = 'title'>Logout</span>
    </div>
  );
};

export default DesktopLogout;