import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNutrition } from '../../slices/nutritionSlice'; // Replace with the correct path
import axios from 'axios';

const NutritionForm = () => {
    const dispatch = useDispatch();
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newNutrition = {
            userId: localStorage.getItem('userId'), // Ensure you have userId in local storage
            foodItem,
            calories,
            protein,
            carbs,
            fats,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/nutrition`, newNutrition, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(addNutrition(response.data));
            // Clear form fields
            setFoodItem('');
            setCalories('');
            setProtein('');
            setCarbs('');
            setFats('');
        } catch (error) {
            console.error('Error adding nutrition:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="foodItem" className="form-label">Food Item</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="foodItem" 
                    value={foodItem} 
                    onChange={(e) => setFoodItem(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="calories" className="form-label">Calories</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="calories" 
                    value={calories} 
                    onChange={(e) => setCalories(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="protein" className="form-label">Protein (g)</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="protein" 
                    value={protein} 
                    onChange={(e) => setProtein(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="carbs" className="form-label">Carbohydrates (g)</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="carbs" 
                    value={carbs} 
                    onChange={(e) => setCarbs(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fats" className="form-label">Fats (g)</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="fats" 
                    value={fats} 
                    onChange={(e) => setFats(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Nutrition</button>
        </form>
    );
};

export default NutritionForm;
