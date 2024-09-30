import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/UserProfile';
import FitnessGoals from './components/FitnessGoals/FitnessGoals';
import Nutrition from './components/Nutrition/Nutrition';
import Workouts from './components/Workouts/Workouts';

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/FitnessGoals" element={<FitnessGoals />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route path="/workouts" element={<Workouts />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
