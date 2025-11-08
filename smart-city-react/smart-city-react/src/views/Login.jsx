import React from 'react';

const Login = ({ onLogin }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const role = e.target.elements['role-selector'].value;
        onLogin(role);
    };

    return (
        <div className="container auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome to the Future</h1>
                    <p>Smart City Management Portal</p>
                </div>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" id="username" placeholder="Username" required />
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" placeholder="Password" required />
                    </div>
                    <div className="input-group">
                        <select id="role-selector" name="role-selector">
                            <option value="user">Citizen</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <button type="submit" className="btn primary-btn">Login</button>
                    <div className="auth-links">
                        <a href="#">Forgot Password?</a>
                        <a href="#">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
