import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import * as bootstrap from 'bootstrap';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // List of routes where navbar should be hidden
    const hideNavbarRoutes = ['/login', '/register'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    useEffect(() => {
        // Initialize all Bootstrap dropdowns
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
        dropdownElementList.forEach(dropdownToggle => {
            new bootstrap.Dropdown(dropdownToggle);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigate('/login');
    };

    if (!shouldShowNavbar) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    <i className="bi bi-heart-pulse-fill me-2"></i>
                    Fitness Tracker
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {isAuthenticated && (
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                                    to="/dashboard"
                                >
                                    <i className="bi bi-speedometer2 me-2"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/workouts' ? 'active' : ''}`} 
                                    to="/workouts"
                                >
                                    <i className="bi bi-activity me-2"></i>
                                    Workouts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/nutrition' ? 'active' : ''}`} 
                                    to="/nutrition"
                                >
                                    <i className="bi bi-clipboard2-pulse me-2"></i>
                                    Nutrition
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/fitnessgoals' ? 'active' : ''}`} 
                                    to="/fitnessgoals"
                                >
                                    <i className="bi bi-trophy me-2"></i>
                                    Goals
                                </Link>
                            </li>
                        </ul>

                        <div className="dropdown">
                            <button 
                                className="btn btn-primary dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-person-circle me-2"></i>
                                {user?.username || 'Profile'}
                            </button>
                            <ul 
                                className="dropdown-menu dropdown-menu-end" 
                                aria-labelledby="profileDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        <i className="bi bi-person me-2"></i>
                                        Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button 
                                        className="dropdown-item text-danger" 
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
