import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <header className="bg-primary text-light text-center py-5">
        <div className="container">
          <h1>Welcome to Fitness Tracker</h1>
          <p>Track your fitness goals, monitor your workouts, and stay on top of your nutrition.</p>
          <Link to="/register" className="btn btn-light btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </header>

      <section className="features py-5">
        <div className="container">
          <div className="row">
            {/* Feature 1 */}
            <div className="col-md-4 text-center">
              <i className="fas fa-dumbbell fa-3x mb-3 text-primary"></i>
              <h3>Track Workouts</h3>
              <p>
                Log your workouts, track progress, and stay motivated with personalized workout plans.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 text-center">
              <i className="fas fa-apple-alt fa-3x mb-3 text-success"></i>
              <h3>Monitor Nutrition</h3>
              <p>
                Keep track of your meals and snacks to ensure you're getting the right nutrition for your goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4 text-center">
              <i className="fas fa-chart-line fa-3x mb-3 text-info"></i>
              <h3>Analyze Progress</h3>
              <p>
                Get insights into your fitness journey and track your achievements over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="call-to-action bg-secondary text-light text-center py-5">
        <div className="container">
          <h2>Ready to Take Control of Your Fitness?</h2>
          <p>Join us today and start your fitness transformation.</p>
          <Link to="/register" className="btn btn-primary btn-lg mt-3">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
