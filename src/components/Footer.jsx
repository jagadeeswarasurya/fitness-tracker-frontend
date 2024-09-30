import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>About Fitness Tracker</h5>
            <p>
              Fitness Tracker helps you achieve your fitness goals by tracking your workouts, nutrition, and progress. Stay motivated and reach your goals with personalized plans and insights.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/FitnessGoals" className="text-light">Set Fitness Goals</Link></li>
              <li><Link to="/Workouts" className="text-light">Track Workouts</Link></li>
              <li><Link to="/Nutrition" className="text-light">Log Nutrition</Link></li>
              <li><Link to="/settings" className="text-light">Settings</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li>
                <a href="https://www.facebook.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" className="text-light" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-3 border-top mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
