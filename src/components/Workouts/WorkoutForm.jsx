// src/components/WorkoutForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../slices/workoutsSlice';
import axios from 'axios';

const WorkoutForm = () => {
    const dispatch = useDispatch();
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newWorkout = {
            userId: localStorage.getItem('userId'), // Ensure you have userId in local storage
            exercise,
            duration,
            intensity,
            caloriesBurned,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/workouts`, newWorkout, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(addWorkout(response.data));
            // Clear form fields
            setExercise('');
            setDuration('');
            setIntensity('');
            setCaloriesBurned('');
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exercise" className="form-label">Exercise</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exercise" 
                    value={exercise} 
                    onChange={(e) => setExercise(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="intensity" className="form-label">Intensity</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="intensity" 
                    value={intensity} 
                    onChange={(e) => setIntensity(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="caloriesBurned" className="form-label">Calories Burned</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="caloriesBurned" 
                    value={caloriesBurned} 
                    onChange={(e) => setCaloriesBurned(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Workout</button>
        </form>
    );
};

export default WorkoutForm;
