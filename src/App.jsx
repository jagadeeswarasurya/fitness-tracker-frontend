import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/authSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Auth/UserProfile';
import Workouts from './components/Workouts/Workouts';
import Nutrition from './components/Nutrition/Nutrition';
import FitnessGoals from './components/FitnessGoals/FitnessGoals';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import { API_URL } from './config/config';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/api/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    dispatch(setUser({ user: response.data, token }));
                } catch (error) {
                    console.error('Auth initialization failed:', error);
                    localStorage.removeItem('token');
                }
            }
        };

        initializeAuth();
    }, [dispatch]);

    
    const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';

    return (
        <div className="d-flex flex-column min-vh-100">
            {!isAuthPage && <Navbar />}
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/workouts" 
                        element={
                            <ProtectedRoute>
                                <Workouts />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/nutrition" 
                        element={
                            <ProtectedRoute>
                                <Nutrition />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/fitnessgoals" 
                        element={
                            <ProtectedRoute>
                                <FitnessGoals />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default App;
