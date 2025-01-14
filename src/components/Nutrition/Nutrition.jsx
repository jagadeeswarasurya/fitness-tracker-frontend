import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Nutrition.css';

const Nutrition = () => {
    const [nutritionEntries, setNutritionEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState(null);
    const [newEntry, setNewEntry] = useState({
        foodItem: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        date: new Date().toISOString().split('T')[0]
    });

    const fetchNutrition = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/nutrition',
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log('Fetched nutrition:', response.data);
            setNutritionEntries(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching nutrition:', err);
            setError(err.response?.data?.message || 'Failed to fetch nutrition data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNutrition();
    }, []);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setNewEntry({
            foodItem: entry.foodItem,
            calories: entry.calories,
            protein: entry.protein,
            carbs: entry.carbs,
            fats: entry.fats,
            date: new Date(entry.date).toISOString().split('T')[0]
        });
        setShowForm(true);
    };

    const handleDelete = async (entryId) => {
        if (window.confirm('Are you sure you want to delete this nutrition entry?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(
                    `http://localhost:5000/api/nutrition/${entryId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                await fetchNutrition();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete entry');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        
        try {
            const token = localStorage.getItem('token');
            
            if (editingEntry) {
                await axios.put(
                    `http://localhost:5000/api/nutrition/${editingEntry._id}`,
                    newEntry,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            } else {
                await axios.post(
                    'http://localhost:5000/api/nutrition',
                    newEntry,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }
            
            await fetchNutrition();
            setNewEntry({
                foodItem: '',
                calories: '',
                protein: '',
                carbs: '',
                fats: '',
                date: new Date().toISOString().split('T')[0]
            });
            setShowForm(false);
            setEditingEntry(null);
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to save entry');
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
                <h2>Nutrition Tracker</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingEntry(null);
                        setNewEntry({
                            foodItem: '',
                            calories: '',
                            protein: '',
                            carbs: '',
                            fats: '',
                            date: new Date().toISOString().split('T')[0]
                        });
                    }}
                >
                    {showForm ? 'Cancel' : 'Add New Entry'}
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
                        <h5 className="card-title">{editingEntry ? 'Edit Entry' : 'Add New Entry'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Food Item</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newEntry.foodItem}
                                    onChange={(e) => setNewEntry({...newEntry, foodItem: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Calories</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newEntry.calories}
                                        onChange={(e) => setNewEntry({...newEntry, calories: e.target.value})}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newEntry.date}
                                        onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Protein (g)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newEntry.protein}
                                        onChange={(e) => setNewEntry({...newEntry, protein: e.target.value})}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Carbs (g)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newEntry.carbs}
                                        onChange={(e) => setNewEntry({...newEntry, carbs: e.target.value})}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Fats (g)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newEntry.fats}
                                        onChange={(e) => setNewEntry({...newEntry, fats: e.target.value})}
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">
                                {editingEntry ? 'Update Entry' : 'Add Entry'}
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
                {Array.isArray(nutritionEntries) && nutritionEntries.length > 0 ? (
                    nutritionEntries.map((entry) => (
                        <div key={entry._id} className="col-md-4 mb-3">
                            <div className="card nutrition-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="card-title">{entry.foodItem}</h5>
                                            <p className="card-text">Calories: {entry.calories} kcal</p>
                                            <div className="macros">
                                                <span className="badge bg-primary macro-badge">
                                                    Protein: {entry.protein}g
                                                </span>
                                                <span className="badge bg-success macro-badge">
                                                    Carbs: {entry.carbs}g
                                                </span>
                                                <span className="badge bg-warning macro-badge">
                                                    Fats: {entry.fats}g
                                                </span>
                                            </div>
                                            <p className="card-text mt-2">
                                                <small className="text-muted">
                                                    Date: {new Date(entry.date).toLocaleDateString()}
                                                </small>
                                            </p>
                                        </div>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleEdit(entry)}
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil-square edit-icon"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(entry._id)}
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
                        <p className="text-center">No nutrition entries found. Start by adding a new entry!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nutrition;
