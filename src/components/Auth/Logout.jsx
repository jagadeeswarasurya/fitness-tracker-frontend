import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice'; // Import logoutUser action
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Remove user token from local storage
        localStorage.removeItem('token');

        // Dispatch logout action to Redux store
        dispatch(logoutUser());

        // Redirect to login page after logout
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
