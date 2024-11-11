import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/userSlice"; // Import the logoutUser action
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Get user state

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    dispatch(logoutUser()); // Dispatch logout action
    navigate("/login"); // Redirect to login page
  };
  
  console.log("Is user logged in?", user.isLoggedIn);



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Fitness Tracker
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/FitnessGoals">
              Fitness Goals
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/nutrition">
              Nutrition
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/workouts">
              Workouts
            </a>
          </li>
          {user.isLoggedIn ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
