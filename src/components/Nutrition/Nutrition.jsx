import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNutritionStart, getNutritionSuccess, getNutritionFailure } from '../../slices/nutritionSlice'; // Ensure the correct path
import NutritionForm from './Nutritionform'; // Import the form component
import { fetchNutritionData } from '../../utils/api'; // Import the API call for fetching nutrition data

const Nutrition = () => {
    const dispatch = useDispatch();
    const nutrition = useSelector((state) => state.nutrition.nutrition);
    const loading = useSelector((state) => state.nutrition.loading);
    const error = useSelector((state) => state.nutrition.error);
    const userId = useSelector((state) => state.user.id); // Assuming user ID is stored in the state

    useEffect(() => {
        const fetchNutrition = async () => {
            dispatch(getNutritionStart());
            try {
                const data = await fetchNutritionData(userId); // API call using the userId
                dispatch(getNutritionSuccess(data));
            } catch (err) {
                console.error("Error fetching nutrition data:", err);
                dispatch(getNutritionFailure(err.message));
            }
        };

        if (userId) {
            fetchNutrition(); // Fetch nutrition data if user ID is available
        }
    }, [dispatch, userId]);

    return (
        <div>
            <h1>Your Nutrition</h1>
            <NutritionForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {nutrition.map((item) => (
                    <li key={item._id}>
                        {item.foodItem} - {item.calories} kcal
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Nutrition;
