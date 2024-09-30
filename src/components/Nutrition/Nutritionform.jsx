import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const NutritionForm = ({ setRefresh }) => {
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const resetForm = () => {
        setFoodItem('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        setDate('');
        setError(''); // Clear error
        setSuccessMessage(''); // Clear success message
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        // Ensure all fields are valid
        if (!foodItem || !calories || !protein || !carbs || !fats || !date) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/nutrition`,
                {
                    foodItem,
                    calories: Number(calories), // Ensure calories is a number
                    protein: Number(protein), // Ensure protein is a number
                    carbs: Number(carbs), // Ensure carbs is a number
                    fats: Number(fats), // Ensure fats is a number
                    date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setSuccessMessage('Nutrition entry added successfully!'); // Set success message
            resetForm(); // Reset form fields
            setRefresh((prev) => !prev); // Trigger refresh
        } catch (error) {
            console.error('Error creating nutrition entry:', error);
            setError(error.response?.data?.message || 'Error creating nutrition entry');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Food Item"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Protein (g)"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Carbs (g)"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Fats (g)"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Add Nutrition Entry</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error in red */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message in green */}
        </form>
    );
};

// PropTypes validation
NutritionForm.propTypes = {
    setRefresh: PropTypes.func.isRequired, // Validate setRefresh as a required function
};

export default NutritionForm;
