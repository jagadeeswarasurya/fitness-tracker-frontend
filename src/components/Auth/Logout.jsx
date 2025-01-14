import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice'; // Import logoutUser action
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        localStorage.removeItem('token');

       
        dispatch(logoutUser());

        
        navigate('/login'); // Redirect to the login page
    }, [dispatch, navigate]);

    return (
        <div className="container mt-5">
            <h2>Logging you out...</h2>
            <p>You will be redirected shortly.</p>
        </div>
    );
};

export default Logout;
