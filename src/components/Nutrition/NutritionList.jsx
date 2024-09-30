import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FitnessGoalList = ({ goals, setRefresh }) => {
    const handleDelete = async (goalId) => {
        try {
            await axios.delete(`http://localhost:5000/api/fitness-goals/${goalId}`);
            setRefresh((prev) => !prev); // Trigger refresh after deletion
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    return (
        <div>
            <h3>Your Fitness Goals</h3>
            <ul>
                {goals.map((goal) => (
                    <li key={goal._id}>
                        {goal.goalType} - {goal.target}
                        <button onClick={() => handleDelete(goal._id)}>Delete</button>
                        {/* Optionally, you can add an edit button or other functionality */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// PropTypes validation
FitnessGoalList.propTypes = {
    goals: PropTypes.array.isRequired, // Validate goals as an array
    setRefresh: PropTypes.func.isRequired, // Validate setRefresh as a required function
};

export default FitnessGoalList;
