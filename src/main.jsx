import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/index'; 
import App from './App'; 
import './styles/App.css'; 

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
