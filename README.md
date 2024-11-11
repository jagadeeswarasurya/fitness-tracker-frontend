# Fitness Tracker - Frontend

This repository contains the frontend code for the **Fitness Tracker** application, designed to help users manage fitness goals, track workouts and nutrition, and monitor progress.

## Project Overview

The Fitness Tracker application allows users to:
- Set personalized fitness goals.
- Track workouts with details like exercises, duration, intensity, and calories burned.
- Log nutrition intake for daily calorie and nutrient tracking.
- Get insights into fitness progress over time.

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux (or Context API)
- **CSS Framework**: Bootstrap for responsive design
- **Routing**: React Router for client-side routing
- **Form Management**: Formik for form handling and validation

## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/project-name-frontend.git
    cd project-name-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the root directory with the following variables:
    ```plaintext
    VITE_API_URL=https://your-backend-api-url.com
    VITE_JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```

    The application will start on `http://localhost:3000` (or another port if specified).

## Deployment on Netlify

1. **Push to GitHub**:
    Ensure all changes are pushed to your frontend GitHub repository.

2. **Netlify Deployment**:
    - Go to [Netlify](https://www.netlify.com/) and sign up or log in.
    - Select "New site from Git" and connect your GitHub repository.
    - Choose your repository and configure build settings:
        - **Build Command**: `npm run build`
        - **Publish Directory**: `dist`
    - **Environment Variables**:
        Add `VITE_API_URL` and `VITE_JWT_SECRET` in the Netlify settings.

3. **Deploy**:
    After configuration, Netlify will build and deploy your site. You will receive a live URL once deployment completes.

---

## License

This project is licensed under the MIT License.
