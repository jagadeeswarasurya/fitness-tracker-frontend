import React, { useState, useEffect } from 'react';
import NutritionForm from './Nutritionform'; // Ensure this is the correct path
import axios from 'axios';

const Nutrition = () => {
    const [entries, setEntries] = useState([]);
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetching

    // Fetch nutrition entries when refresh state changes
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/nutrition`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching nutrition entries:', error);
            }
        };

        fetchEntries();
    }, [refresh]); // Fetch entries whenever refresh changes

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Nutrition Tracker</h1>
            
            {/* NutritionForm for adding new entries */}
            <div className="card shadow mb-5">
                <div className="card-body">
                    <h2 className="card-title">Add a New Nutrition Entry</h2>
                    <NutritionForm setRefresh={setRefresh} /> {/* Pass setRefresh to the form */}
                </div>
            </div>

            {/* Display Nutrition Entries */}
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">Your Nutrition Entries</h2>
                    <div className="row">
                        {entries.length > 0 ? (
                            entries.map((entry) => (
                                <div className="col-md-4 mb-3" key={entry._id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{entry.foodItem}</h5>
                                            <p className="card-text">
                                                Calories: {entry.calories} <br />
                                                Protein: {entry.protein}g <br />
                                                Carbs: {entry.carbs}g <br />
                                                Fats: {entry.fats}g <br />
                                                Date: {new Date(entry.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No nutrition entries found. Add one above!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;
