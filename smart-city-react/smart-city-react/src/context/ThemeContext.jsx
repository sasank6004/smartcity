/* eslint-disable react-refresh/only-export-components */
// src/context/ThemeContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // FIX: Default to 'dark' or read from system preference if nothing in storage
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'dark' 
    );

    useEffect(() => {
        // This is the crucial line: it applies the attribute that the CSS targets
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);