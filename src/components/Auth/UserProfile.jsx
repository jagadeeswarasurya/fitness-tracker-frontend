import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { API_URL } from '../../config/config';

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching profile from:', `${API_URL}/api/users/profile`);
            const response = await axios.get(`${API_URL}/api/users/profile`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Profile response:', response.data);
            setProfileData(response.data);
            setFormData({
                ...formData,
                username: response.data.username
            });
            setLoading(false);
        } catch (err) {
            console.error('Profile fetch error:', err);
            setError(err.response?.data?.message || 'Failed to fetch profile data');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate passwords if changing password
        if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmNewPassword) {
                setError('New passwords do not match');
                return;
            }
            if (!formData.currentPassword) {
                setError('Current password is required to change password');
                return;
            }
        }

        try {
            const token = localStorage.getItem('token');
            const updateData = {
                username: formData.username,
                ...(formData.newPassword && {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            };

            console.log('Updating profile at:', `${API_URL}/api/users/update`); // Changed endpoint
            const response = await axios.put(`${API_URL}/api/users/update`, updateData, { // Changed from /profile to /update
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Update response:', response.data);

            // Reset password fields
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
            
            setEditMode(false);
            fetchProfileData(); // Refresh profile data
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
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
        <div className="profile-container py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="card-title mb-0">Profile Information</h2>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        <i className={`bi bi-${editMode ? 'x' : 'pencil'} me-2`}></i>
                                        {editMode ? 'Cancel' : 'Edit Profile'}
                                    </button>
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                {editMode ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Current Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                placeholder="Enter current password to change it"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirmNewPassword"
                                                value={formData.confirmNewPassword}
                                                onChange={handleInputChange}
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="bi bi-check-lg me-2"></i>
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="profile-info">
                                        <div className="info-item">
                                            <label>Username</label>
                                            <p>{profileData.username}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
