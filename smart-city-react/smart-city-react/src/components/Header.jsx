// src/components/Header.jsx

import React from 'react';
import { useTheme } from '../context/ThemeContext'; 

const Header = ({ logoText, navItems, activeView, onNavigate, onLogout }) => {
    const { theme, toggleTheme } = useTheme(); 

    return (
        <header className="main-header">
            <div className="logo">{logoText}</div>
            <nav>
                {navItems.map((item) => (
                    <a 
                        key={item.id}
                        href={item.href} 
                        className={`nav-link ${activeView === item.id ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (item.id === 'logout') {
                                onLogout();
                            } else {
                                onNavigate(item.id);
                            }
                        }}
                    >
                        {item.text}
                    </a>
                ))}
                
                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme} 
                    className="btn" 
                    style={{ 
                        marginLeft: '1.5rem', 
                        padding: '0.5rem 0.8rem', 
                        fontSize: '0.85rem',
                        backgroundColor: 'var(--primary-hover)', 
                        color: 'var(--text-highlight)'
                    }}
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </nav>
        </header>
    );
};

export default Header;