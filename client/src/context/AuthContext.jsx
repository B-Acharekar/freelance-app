// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user & token from localStorage initially, normalize _id
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    try {
      const parsedUser = JSON.parse(storedUser);
      // Normalize _id: if missing, fallback to id or undefined
      return {
        ...parsedUser,
        _id: parsedUser._id || parsedUser.id,
      };
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // On login, normalize and save user with _id
  const login = (userData, jwtToken) => {
    const normalizedUser = {
      ...userData,
      _id: userData._id || userData.id,
    };

    localStorage.setItem('user', JSON.stringify(normalizedUser));
    localStorage.setItem('token', jwtToken);
    setUser(normalizedUser);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
