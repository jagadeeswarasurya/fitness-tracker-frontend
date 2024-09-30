import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FitnessGoalForm = ({ setRefresh }) => {
    const [goalType, setGoalType] = useState('');
    const [target, setTarget] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure goalType and target are valid
            if (!goalType || !target) {
                setError('Goal Type and Target are required.');
                return;
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/api/fitness-goals`, 
                { goalType, target },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setGoalType(''); // Reset field
            setTarget(''); // Reset field
            setRefresh((prev) => !prev); // Trigger refresh
            setError(''); // Clear error
        } catch (error) {
            console.error('Error creating goal:', error);
            setError(error.response?.data?.message || 'Error creating goal');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Goal Type"
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
            />
            <button type="submit">Add Goal</button>
            {error && <p>{error}</p>}
        </form>
    );
};

// PropTypes validation
FitnessGoalForm.propTypes = {
    setRefresh: PropTypes.func.isRequired, // Validate setRefresh as a required function
};

export default FitnessGoalForm;
