// src/App.jsx

import React, { useState } from 'react';
import Login from './views/Login';
import AdminDashboard from './views/AdminDashboard';
import CitizenDashboard from './views/CitizenDashboard';
import './App.css'; 

function App() {
    const [view, setView] = useState('guest'); 

    const handleLogin = (role) => {
        setView(role);
    };

    const handleLogout = () => {
        setView('guest');
    };

    const renderView = () => {
        switch (view) {
            case 'admin':
                return <AdminDashboard onLogout={handleLogout} />;
            case 'user':
                return <CitizenDashboard onLogout={handleLogout} />;
            case 'guest':
            default:
                return <Login onLogin={handleLogin} />;
        }
    };

    return (
        <div className="app-container">
            {renderView()}
        </div>
    );
}

export default App;