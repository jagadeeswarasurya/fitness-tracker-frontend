import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { API_URL } from '../../config/config';

const Dashboard = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfileData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile data');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container py-5">
            <div className="container">
                {/* Welcome Section */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="welcome-card bg-primary text-white p-4 rounded-3">
                            <h1 className="display-5 fw-bold mb-3">Welcome, {profileData?.username}!</h1>
                            <p className="lead mb-0">Track your progress, achieve your goals, and maintain a healthy lifestyle.</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon bg-primary text-white">
                                <i className="bi bi-activity"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{profileData?.workouts?.length || 0}</h3>
                                <p>Total Workouts</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon bg-success text-white">
                                <i className="bi bi-trophy"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{Array.isArray(profileData?.fitnessGoals) ? profileData.fitnessGoals.length : 0}</h3>
                                <p>Active Goals</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon bg-info text-white">
                                <i className="bi bi-clipboard2-pulse"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{profileData?.nutrition?.length || 0}</h3>
                                <p>Nutrition Entries</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity and Quick Actions */}
                <div className="row g-4">
                    {/* Recent Goals */}
                    <div className="col-lg-8">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Recent Goals</h5>
                                {Array.isArray(profileData?.fitnessGoals) && profileData.fitnessGoals.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Goal Type</th>
                                                    <th>Target</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.fitnessGoals.slice(0, 5).map(goal => (
                                                    <tr key={goal._id}>
                                                        <td>{goal.goalType}</td>
                                                        <td>{goal.target}</td>
                                                        <td>{new Date(goal.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-center text-muted">No goals set yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-lg-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Quick Actions</h5>
                                <div className="d-grid gap-3">
                                    <Link to="/workouts" className="btn btn-primary">
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Log New Workout
                                    </Link>
                                    <Link to="/nutrition" className="btn btn-success">
                                        <i className="bi bi-journal-plus me-2"></i>
                                        Track Nutrition
                                    </Link>
                                    <Link to="/fitnessgoals" className="btn btn-info">
                                        <i className="bi bi-flag me-2"></i>
                                        Set New Goal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 