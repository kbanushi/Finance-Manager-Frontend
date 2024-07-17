import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Your Finance Manager</h1>
            <p>
                Manage your finances efficiently with the power of machine learning.
                Our app helps you track expenses, analyze spending habits, and make
                informed financial decisions.
            </p>
            <div className="welcome-buttons">
                <button onClick={goToLogin}>Login</button>
                <button onClick={goToRegister}>Register</button>
            </div>
        </div>
    );
};

export default Welcome;
