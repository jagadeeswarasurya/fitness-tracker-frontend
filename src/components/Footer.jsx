import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-dark text-light py-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    {/* About Section */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3">About Fitness Tracker</h5>
                        <p className="mb-4">
                            Your personal fitness companion helping you achieve your health and fitness goals. 
                            Track workouts, monitor nutrition, and stay motivated on your fitness journey.
                        </p>
                        <div className="social-links">
                            <a href="#" className="me-3" title="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="me-3" title="Twitter">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="me-3" title="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/dashboard" className="footer-link">
                                    <i className="bi bi-chevron-right me-2"></i>Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/workouts" className="footer-link">
                                    <i className="bi bi-chevron-right me-2"></i>Workouts
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/nutrition" className="footer-link">
                                    <i className="bi bi-chevron-right me-2"></i>Nutrition
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/fitnessgoals" className="footer-link">
                                    <i className="bi bi-chevron-right me-2"></i>Fitness Goals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <i className="bi bi-geo-alt me-2"></i>
                                123 Fitness Street, Healthy City
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-envelope me-2"></i>
                                support@fitnesstracker.com
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-telephone me-2"></i>
                                +1 234 567 8900
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center border-top border-secondary pt-4 mt-4">
                    <p className="mb-0">
                        © {currentYear} Fitness Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
