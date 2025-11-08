// src/views/AdminDashboard.jsx

import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintsContext';
import Header from '../components/Header';
import Card from '../components/Card';

const ADMIN_NAV_ITEMS = [
    { text: 'Dashboard', href: '#admin-dashboard', id: 'admin-dashboard' },
    { text: 'Manage City', href: '#city-management', id: 'city-management' },
    { text: 'Complaints', href: '#complaints', id: 'complaints' },
    { text: 'Feedback', href: '#feedback', id: 'feedback' },
    { text: 'Service Updates', href: '#updates', id: 'updates' },
    { text: 'Logout', href: 'index.html', id: 'logout' },
];

const AdminDashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('admin-dashboard');
    const { complaints, updateComplaintStatus } = useComplaints();

    const handleToggle = (id, currentStatus) => {
        if (currentStatus === 'New') updateComplaintStatus(id, 'In Progress');
        else if (currentStatus === 'In Progress') updateComplaintStatus(id, 'Resolved');
        else if (currentStatus === 'Resolved') updateComplaintStatus(id, 'Archived');
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'admin-dashboard':
                return (
                    <section id="admin-dashboard" className="content-section">
                        <h2>Admin Control Center</h2>
                        
                        {/* FIX: Using grid-container-metrics for guaranteed 50/50 split on large screens */}
                        <div className="grid-container-metrics"> 
                            <Card title="Total Citizens Registered" data="12,548" />
                            <Card title="Active Complaints" data="56 Pending" />
                            
                            <Card title="Average Response Time" data="4.2 hrs" /> 
                            <Card title="City Zones Monitored" data="18 Active Zones" /> 
                        </div>

                        {/* Full-width visualization block */}
                        <div style={{marginTop: '3rem'}}>
                            <h2>Real-Time Infrastructure Health</h2>
                            <div className="chart-placeholder">
                                Live Data Chart Placeholder (e.g., Complaint Trends, Energy Usage)
                            </div>
                        </div>
                        
                    </section>
                );

            case 'city-management':
                return (
                    <section id="city-management" className="content-section">
                        <h2>Manage City Details</h2>
                        <div className="form-card">
                            <form className="form-grid">
                                <div className="input-group">
                                    <label htmlFor="update-type">Update Type</label>
                                    <select id="update-type">
                                        <option>Infrastructure Status</option>
                                        <option>Traffic Management</option>
                                        <option>Water Supply</option>
                                        <option>Waste Disposal</option>
                                        <option>Energy Usage</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="zone-id">Target Zone ID</label>
                                    <input type="text" id="zone-id" placeholder="e.g., North Zone" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="update-description">Details / Changes</label>
                                    <textarea id="update-description" rows="4" placeholder="Enter city management update..."></textarea>
                                </div>
                                <button className="btn primary-btn">Save Update</button>
                            </form>
                        </div>
                    </section>
                );
            
            case 'complaints':
                return (
                    <section id="complaints" className="content-section">
                        <h2>Citizen Complaints</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Complaint ID</th>
                                        <th>Citizen Name</th>
                                        <th>Issue Type</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center' }}>No complaints yet</td>
                                        </tr>
                                    )}
                                    {complaints.map(c => (
                                        <tr key={c.id}>
                                            <td>{c.id}</td>
                                            <td>{c.citizenName}</td>
                                            <td>{c.issueType}</td>
                                            <td>{c.address || '—'}</td>
                                            <td><span className={`status ${c.status.toLowerCase().replace(/ /g, '-')}`}>{c.status}</span></td>
                                            <td>
                                                <button className="btn" onClick={() => alert(JSON.stringify(c, null, 2))}>View</button>
                                                <button className="btn" style={{ marginLeft: '0.5rem' }} onClick={() => handleToggle(c.id, c.status)}>
                                                    {c.status === 'New' ? 'Start' : c.status === 'In Progress' ? 'Resolve' : 'Next'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                );

            case 'feedback':
                return (
                    <section id="feedback" className="content-section">
                        <h2>Citizen Feedback</h2>
                        <div className="grid-container">
                            <Card children={<><p>“Excellent waste management improvement in Sector 5.”</p><p className="text-secondary">– Priya Nair</p></>} highlightClass="" />
                            <Card children={<><p>“Traffic signals need better synchronization during peak hours.”</p><p className="text-secondary">– Sameer Khan</p></>} highlightClass="" />
                            <Card children={<><p>“Great mobile app integration for city updates!”</p><p className="text-secondary">– Kavita Joshi</p></>} highlightClass="" />
                        </div>
                    </section>
                );

            case 'updates':
                return (
                    <section id="updates" className="content-section">
                        <h2>Service Updates</h2>
                        <div className="form-card">
                            <form className="form-grid">
                                <div className="input-group">
                                    <label htmlFor="service-title">Service Title</label>
                                    <input type="text" id="service-title" placeholder="e.g., Water Supply Interruption" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="service-duration">Duration / Zone</label>
                                    <input type="text" id="service-duration" placeholder="e.g., 8 AM - 12 PM, Sector 5" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="service-details">Update Details</label>
                                    <textarea id="service-details" rows="4" placeholder="Write service update details here..."></textarea>
                                </div>
                                <button className="btn primary-btn">Post Update</button>
                            </form>
                        </div>

                        <div className="grid-container" style={{ marginTop: '2rem' }}>
                            <div className="service-card">
                                <h4>Power Maintenance</h4>
                                <p className="text-secondary">Scheduled maintenance in North Zone from 10 AM – 1 PM.</p>
                            </div>
                            <div className="service-card">
                                <h4>Water Supply Notice</h4>
                                <p className="text-secondary">Temporary disruption due to pipeline repairs in Sector 3.</p>
                            </div>
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
                logoText="SmartCity Admin" 
                navItems={ADMIN_NAV_ITEMS}
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

export default AdminDashboard;