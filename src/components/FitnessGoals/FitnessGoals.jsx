// src/components/FitnessGoals.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FitnessGoals.css';
import { API_URL } from '../../config/config';

const FitnessGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        goalType: '',
        target: '',
        deadline: '',
        description: ''
    });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/goals`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGoals(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch goals');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewGoal({
            ...newGoal,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/goals`, newGoal, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGoals([...goals, response.data]);
            setShowForm(false);
            setNewGoal({
                goalType: '',
                target: '',
                deadline: '',
                description: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create goal');
        }
    };

    const handleDelete = async (goalId) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/api/fitness-goals/${goalId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setGoals(goals.filter(goal => goal._id !== goalId));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete goal');
            }
        }
    };

    const handleUpdateProgress = async (goalId, newProgress) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/api/fitness-goals/${goalId}/progress`,
                { progress: newProgress },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setGoals(goals.map(goal => 
                goal._id === goalId ? { ...goal, progress: response.data.progress } : goal
            ));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update progress');
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
        <div className="fitness-goals-container py-5">
            <div className="container">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">
                            <i className="bi bi-trophy me-2"></i>
                            Fitness Goals
                        </h2>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowForm(!showForm)}
                        >
                            <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-lg'} me-2`}></i>
                            {showForm ? 'Cancel' : 'Add New Goal'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Add Goal Form */}
                {showForm && (
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Create New Goal</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Goal Type</label>
                                                <select
                                                    className="form-select"
                                                    name="goalType"
                                                    value={newGoal.goalType}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Goal Type</option>
                                                    <option value="Weight Loss">Weight Loss</option>
                                                    <option value="Muscle Gain">Muscle Gain</option>
                                                    <option value="Running">Running</option>
                                                    <option value="Strength">Strength Training</option>
                                                    <option value="Flexibility">Flexibility</option>
                                                    <option value="Endurance">Endurance</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Target</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="target"
                                                    value={newGoal.target}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Lose 10kg, Run 5km"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Deadline</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="deadline"
                                                    value={newGoal.deadline}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    value={newGoal.description}
                                                    onChange={handleInputChange}
                                                    rows="3"
                                                    placeholder="Add details about your goal"
                                                ></textarea>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="bi bi-check-lg me-2"></i>
                                                    Save Goal
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Goals Grid */}
                <div className="row g-4">
                    {goals.map((goal) => (
                        <div key={goal._id} className="col-md-6 col-lg-4">
                            <div className="goal-card card h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title mb-0">{goal.goalType}</h5>
                                        <div className="progress-input">
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                value={goal.progress || 0}
                                                onChange={(e) => handleUpdateProgress(goal._id, e.target.value)}
                                                min="0"
                                                max="100"
                                            />
                                            <span className="progress-symbol">%</span>
                                        </div>
                                    </div>
                                    <p className="card-text">{goal.target}</p>
                                    <div className="progress mb-3">
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ width: `${goal.progress || 0}%` }}
                                            aria-valuenow={goal.progress} 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">
                                            Deadline: {new Date(goal.deadline).toLocaleDateString()}
                                        </small>
                                        <div className="btn-group">
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(goal._id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {goals.length === 0 && !showForm && !loading && (
                    <div className="text-center py-5">
                        <i className="bi bi-clipboard-plus display-4 text-muted mb-3"></i>
                        <p className="lead">No fitness goals set yet. Start by adding a new goal!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FitnessGoals;
