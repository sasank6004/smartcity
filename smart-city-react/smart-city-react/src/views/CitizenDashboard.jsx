import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintsContext';
import Header from '../components/Header';
import Card from '../components/Card';

const USER_NAV_ITEMS = [
    { text: 'Dashboard', href: '#dashboard', id: 'dashboard' },
    { text: 'Report Issue', href: '#report', id: 'report' },
    { text: 'City Services', href: '#services', id: 'services' },
    { text: 'Mobility', href: '#transit', id: 'transit' },
    { text: 'Profile', href: '#profile', id: 'profile' },
    { text: 'Logout', href: '#', id: 'logout' },
];

const CitizenDashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    // report form state (hooks must be at top level)
    const [name, setName] = useState('');
    const [issueType, setIssueType] = useState('Pothole');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const { addComplaint } = useComplaints();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description) {
            alert('Please provide your name and a description.');
            return;
        }
        addComplaint({ citizenName: name, issueType, address, description });
        // Clear form and navigate to dashboard
        setName('');
        setIssueType('Pothole');
        setAddress('');
        setDescription('');
        setActiveSection('dashboard');
        alert('Complaint submitted. Admin will be notified.');
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <section id="dashboard" className="content-section">
                        <h2>Welcome, Citizen!</h2>
                        <div className="grid-container-metrics">
                            <Card title="Real-Time Air Quality" data="AQI: 45 (Good)" />
                            <Card title="Live Traffic Status" data="Low Congestion" />
                            <Card title="Next Public Bus" data="Route 5B: 5 mins" />
                            <Card title="My Reported Issues" data="2 Open | 5 Resolved" />
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h2>City News & Alerts</h2>
                            <div className="grid-container">
                                <div className="service-card">
                                    <h4>Scheduled Water Maintenance</h4>
                                    <p className="text-secondary">Disruption expected in Sector 4 on Friday, 9 AM - 1 PM.</p>
                                </div>
                                <div className="service-card">
                                    <h4>Community Cleanup Drive</h4>
                                    <p className="text-secondary">Join us this Saturday at Central Park at 10 AM. Gloves provided!</p>
                                </div>
                                <div className="service-card">
                                    <h4>Road Closure Alert</h4>
                                    <p className="text-secondary">Road 101 near the stadium is closed until further notice.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h2>Local Traffic & Incident Overview</h2>
                            <div className="map-placeholder-large">
                                Interactive Map/Heatmap Placeholder for Local Incidents
                            </div>
                        </div>
                    </section>
                );
            case 'report':
                return (
                    <section id="report" className="content-section">
                        <h2>Report an Issue or Provide Feedback</h2>
                        <form className="form-card" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label htmlFor="report-name">Your Name</label>
                                    <input id="report-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Upendra" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="issue-type">Type of Issue</label>
                                    <select id="issue-type" value={issueType} onChange={e => setIssueType(e.target.value)}>
                                        <option>Pothole</option>
                                        <option>Streetlight Outage</option>
                                        <option>Waste Management</option>
                                        <option>Public Safety Concern</option>
                                        <option>General Feedback</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="address-text">Street Address</label>
                                    <input id="address-text" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., 456 Main St" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" rows="4" value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide details..."></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn primary-btn" style={{ marginTop: '1.5rem' }}>
                                Submit Report
                            </button>
                        </form>
                    </section>
                );
            case 'services':
                return (
                    <section id="services" className="content-section">
                        <h2>City Services & Information Hub</h2>
                        <div className="grid-container">
                            <div className="service-card"><h4>Utility Payments</h4><p className="text-secondary">Pay your water and electricity bills online.</p></div>
                            <div className="service-card"><h4>Emergency Contacts</h4><p className="text-secondary">Quick access to police, fire, and medical services.</p></div>
                            <div className="service-card"><h4>Permits & Licenses</h4><p className="text-secondary">Apply for building permits and business licenses.</p></div>
                            <div className="service-card"><h4>Community Centers</h4><p className="text-secondary">Find events and book facilities.</p></div>
                        </div>
                    </section>
                );
            case 'transit':
                return (
                    <section id="transit" className="content-section">
                        <h2>Public Transit & Mobility</h2>
                        <div className="map-placeholder-large">Live Transit Map Placeholder</div>
                    </section>
                );
            case 'profile':
                return (
                    <section id="profile" className="content-section">
                        <h2>My Profile</h2>
                        <div className="profile-card">
                            <p><strong>Name:</strong> Upendra</p>
                            <p><strong>Email:</strong> upendra.doe@email.com</p>
                            <p><strong>Address:</strong> 123 gandhi nagar, Smart City</p>
                            <button className="btn" style={{ marginTop: '1rem' }}>Edit Profile</button>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header
                logoText="SmartCity"
                navItems={USER_NAV_ITEMS}
                activeView={activeSection}
                onNavigate={setActiveSection}
                onLogout={onLogout}
            />
            <div className="container main-content">
                {renderSection()}
            </div>
        </>
    );
};

export default CitizenDashboard;
