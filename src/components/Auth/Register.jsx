import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading when the form is submitted
        setMessage(''); // Clear previous messages
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                username,
                password,
            });
            setMessage(response.data.message);
            setUsername(''); // Clear input fields after successful registration
            setPassword('');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration
            }, 2000); // Add a 2-second delay before redirect
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            {message && <div className={`alert ${message.includes('failed') ? 'alert-danger' : 'alert-info'}`}>{message}</div>}
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username" // Added autocomplete attribute
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password" // Added autocomplete attribute for password
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'} {/* Show loading text */}
                </button>
                <p className="mt-3 text-center">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
