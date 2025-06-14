import React from "react";
import { useAuth } from "./AuthContext"; // Updated to correct path
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { userData, logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="avatar">{userData?.fullName?.charAt(0) || 'A'}</div>
            <h3>{userData?.fullName || 'Administrator'}</h3>
            <p>System Administrator</p>
          </div>

          <nav className="dashboard-nav">
            <ul>
              <li className="active"><i className="icon-dashboard"></i><span>Dashboard</span></li>
              <li><i className="icon-tenders"></i><span>Manage Tenders</span></li>
              <li><i className="icon-users"></i><span>Manage Users</span></li>
              <li><i className="icon-security"></i><span>Security</span></li>
              <li><i className="icon-disputes"></i><span>Disputes</span></li>
              <li><i className="icon-reports"></i><span>Reports</span></li>
              <li onClick={logout} style={{ cursor: 'pointer' }}>
                <i className="icon-logout"></i><span>Logout</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <header className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <div className="user-info">
              <span>Welcome, {userData?.fullName || 'Administrator'}</span>
            </div>
            <div className="stats-container">
              <div className="stat-card"><h3>Total Users</h3><p>1,243</p></div>
              <div className="stat-card"><h3>Tenders Submitted</h3><p>342</p></div>
              <div className="stat-card"><h3>Approved Bids</h3><p>128</p></div>
              <div className="stat-card"><h3>Pending Bids</h3><p>54</p></div>
              <div className="stat-card"><h3>Rejected Bids</h3><p>23</p></div>
              <div className="stat-card"><h3>AI Model Accuracy</h3><p>92%</p></div>
            </div>
          </header>

          <section className="dashboard-section">
            <h2>Tender & Bid Management</h2>
            <ul className="feature-list">
              <li>View and manage all tenders</li>
              <li>Approve / Reject / Flag contractor bids</li>
              <li>Monitor AI-generated bid rankings</li>
              <li>Manually override rankings with audit tracking</li>
            </ul>
          </section>

          <section className="dashboard-section">
            <h2>User Management</h2>
            <ul className="feature-list">
              <li>View contractor and homeowner profiles</li>
              <li>Activate / Deactivate user accounts</li>
              <li>Flag suspicious user activity</li>
              <li>Assign or modify user roles</li>
            </ul>
          </section>

          <section className="dashboard-section">
            <h2>Security & Access Control</h2>
            <ul className="feature-list">
              <li>Enable or disable Multi-Factor Authentication (MFA)</li>
              <li>View login logs and suspicious activity alerts</li>
              <li>Manage role-based permissions (RBAC)</li>
            </ul>
          </section>

          <section className="dashboard-section">
            <h2>Dispute Resolution Panel</h2>
            <ul className="feature-list">
              <li>Monitor and resolve active disputes</li>
              <li>Update dispute statuses (Open, In Review, Resolved)</li>
              <li>View communication thread history</li>
            </ul>
          </section>

          <section className="dashboard-section">
            <h2>Report Generation</h2>
            <ul className="feature-list">
              <li>Download bid evaluation reports</li>
              <li>Export cost estimation summaries</li>
              <li>Access contractor performance history</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;