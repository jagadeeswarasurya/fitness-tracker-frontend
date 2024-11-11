import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice'; // Import the setUser action

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Hook to dispatch actions

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                username,
                password,
            });
            // Dispatch user data to the store
            dispatch(setUser({ id: response.data.user.id, name: response.data.user.username }));
            setMessage(response.data.message);
            setUsername(''); // Clear input fields after success
            setPassword('');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error); // Log the error for debugging
            setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
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
                        autoComplete="username"
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
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <p className="mt-3 text-center">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
