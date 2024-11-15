import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice'; // Import the setUser action

const Login = () => {
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                username,
                password,
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);

            // Dispatch user data to the store
            dispatch(setUser({ id: response.data.user.id, name: response.data.user.username }));
            setMessage('Login successful!');
            setUsername('');
            setPassword('');
            navigate('/'); // Redirect to the home page after login
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            {message && (
                <div className={`alert ${message.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}
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
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isLoading}>
                    {isLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Login'
                    )}
                </button>
                <p className="mt-3 text-center">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
