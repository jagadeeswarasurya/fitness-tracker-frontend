import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workouts.css';
import { API_URL } from '../../config/config';

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingWorkout, setEditingWorkout] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState(null);
    const [newWorkout, setNewWorkout] = useState({
        exercise: '',
        duration: '',
        intensity: 'Medium',
        caloriesBurned: ''
    });

    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/workouts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWorkouts(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch workouts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleEdit = (workout) => {
        setEditingWorkout(workout);
        setNewWorkout({
            exercise: workout.exercise,
            duration: workout.duration,
            intensity: workout.intensity,
            caloriesBurned: workout.caloriesBurned
        });
        setShowForm(true);
    };

    const handleDelete = async (workoutId) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(
                    `http://localhost:5000/api/workouts/${workoutId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                await fetchWorkouts();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete workout');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/workouts`, newWorkout, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWorkouts([...workouts, response.data]);
            setNewWorkout({
                exercise: '',
                duration: '',
                intensity: 'Medium',
                caloriesBurned: ''
            });
            setShowForm(false);
            setEditingWorkout(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create workout');
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Workouts</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Add New Workout'}
                </button>
            </div>

            {formError && (
                <div className="alert alert-danger mb-4">
                    {formError}
                </div>
            )}

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Add New Workout</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Exercise Type</label>
                                <select
                                    className="form-select"
                                    value={newWorkout.exercise}
                                    onChange={(e) => setNewWorkout({...newWorkout, exercise: e.target.value})}
                                    required
                                >
                                    <option value="">Select Exercise</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                    <option value="Swimming">Swimming</option>
                                    <option value="Weight Training">Weight Training</option>
                                    <option value="Yoga">Yoga</option>
                                    <option value="HIIT">HIIT</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Duration (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={newWorkout.duration}
                                    onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Intensity</label>
                                <select
                                    className="form-select"
                                    value={newWorkout.intensity}
                                    onChange={(e) => setNewWorkout({...newWorkout, intensity: e.target.value})}
                                    required
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Calories Burned</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={newWorkout.caloriesBurned}
                                    onChange={(e) => setNewWorkout({...newWorkout, caloriesBurned: e.target.value})}
                                    required
                                    min="0"
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Add Workout
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="row">
                {Array.isArray(workouts) && workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <div key={workout._id} className="col-md-4 mb-3">
                            <div className="card workout-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="card-title">{workout.exercise}</h5>
                                            <div className="workout-stats">
                                                <p className="card-text">Duration: {workout.duration} minutes</p>
                                                <p className="card-text">Intensity: {workout.intensity}</p>
                                                <p className="card-text">Calories: {workout.caloriesBurned}</p>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Date: {new Date(workout.createdAt).toLocaleDateString()}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleEdit(workout)}
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil-square edit-icon"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(workout._id)}
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash delete-icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No workouts found. Start by adding a new workout!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workouts;
