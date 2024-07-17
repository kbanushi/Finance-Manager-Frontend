import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            fetchProfile(token);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed');
        }
    };

    const fetchProfile = async (token) => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const loginWithGoogle = async (code, state) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/auth/callback?code=${code}&state=${state}`);
            const reponseToken = response.data.token;
            localStorage.setItem('token', reponseToken);
            setToken(reponseToken);
            fetchProfile(reponseToken);
        } catch (error) {
            console.error('Google login failed:', error);
            throw new Error('Google login failed');
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, login, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
