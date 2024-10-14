// src/components/FitnessGoalForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFitnessGoal } from '../../slices/fitnessGoalsSlice'; // Adjust the import path accordingly
import axios from 'axios';

const FitnessGoalForm = () => {
    const dispatch = useDispatch();
    const [goalType, setGoalType] = useState('');
    const [target, setTarget] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newGoal = {
            userId: localStorage.getItem('userId'), // Ensure you have userId in local storage
            goalType,
            target,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/fitness-goals`, newGoal, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(addFitnessGoal(response.data));
            // Clear form fields
            setGoalType('');
            setTarget('');
        } catch (error) {
            console.error('Error adding fitness goal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="goalType" className="form-label">Goal Type</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="goalType" 
                    value={goalType} 
                    onChange={(e) => setGoalType(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="target" className="form-label">Target</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="target" 
                    value={target} 
                    onChange={(e) => setTarget(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Fitness Goal</button>
        </form>
    );
};

export default FitnessGoalForm;
