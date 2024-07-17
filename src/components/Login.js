import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/login/oauth';
    };

    const handleGoogleCallback = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token'); // Assuming you are passing the token in the query params

        if (token) {
            try {
                await loginWithGoogle(token);
                navigate('/home');
            } catch (error) {
                console.error('Google login failed:', error);
            }
        }
    };

    React.useEffect(() => {
        handleGoogleCallback();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <button type="button" onClick={handleLogin}>Log In With Google</button>
        </form>
    );
};

export default Login;
