import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUploadRedirect = () => {
        navigate('/upload');
    };

    return (
        <div>
            <h1>Home Page</h1>
            {user && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <button onClick={handleUploadRedirect}>Go To File Upload</button>
                </div>
            )}
        </div>
    );
};

export default Home;