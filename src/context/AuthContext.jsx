import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('jeeny_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('jeeny_users')) || [];
        const matched = users.find(u => u.email === email && u.password === password);
        if (matched) {
            localStorage.setItem('jeeny_user', JSON.stringify(matched));
            setUser(matched);
            return true;
        }
        return false;
    };

    const register = (userObj) => {
        const users = JSON.parse(localStorage.getItem('jeeny_users')) || [];
        const exists = users.some(u => u.email === userObj.email);
        if (exists) return false;
        const newUser = { ...userObj, id: Date.now().toString(), rides: [] };
        users.push(newUser);
        localStorage.setItem('jeeny_users', JSON.stringify(users));
        localStorage.setItem('jeeny_user', JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('jeeny_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
