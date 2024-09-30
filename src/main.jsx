import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/index'; // Your Redux store
import App from './App'; // Your main App component
import './styles/App.css'; // Global CSS styles

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
