import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiPlus, 
  FiEye, 
  FiCalendar, 
  FiDollarSign,
  FiTool,
  FiFileText,
  FiTrendingUp,
  FiActivity,
  FiBell,
  FiSearch
} from "react-icons/fi";
import "./HomeownerDashboard.css";

const HomeownerDashboard = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Mock data - replace with real data from your Firebase
  const projects = [
    { id: 1, title: "Kitchen Renovation", status: "In Progress", progress: 65, budget: 25000, contractor: "ABC Contractors" },
    { id: 2, title: "Bathroom Remodel", status: "Planning", progress: 15, budget: 12000, contractor: "XYZ Builders" },
    { id: 3, title: "Living Room Upgrade", status: "Completed", progress: 100, budget: 8000, contractor: "Modern Homes" }
  ];

  const recentActivities = [
    { id: 1, text: "New bid received for Kitchen Renovation", time: "2 hours ago", type: "bid" },
    { id: 2, text: "Bathroom Remodel project started", time: "1 day ago", type: "project" },
    { id: 3, text: "Payment processed for Living Room Upgrade", time: "3 days ago", type: "payment" }
  ];

  return (
    <div className="homeowner-dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-section">
              <FiHome className="logo-icon" />
              <h2>GharNirman</h2>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-avatar">
              {userData?.fullName?.charAt(0) || 'H'}
            </div>
            <div className="profile-info">
              <h3>{userData?.fullName || 'Homeowner'}</h3>
              <p>Property Owner</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
                <FiActivity className="nav-icon" />
                <span>Overview</span>
              </li>
              <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
                <FiFileText className="nav-icon" />
                <span>My Projects</span>
              </li>
              <li onClick={() => handleNavigate("/tender")}>
                <FiPlus className="nav-icon" />
                <span>New Project</span>
              </li>
              <li onClick={() => handleNavigate("/cost-estimator")}>
                <FiDollarSign className="nav-icon" />
                <span>Cost Estimator</span>
              </li>
              <li onClick={() => handleNavigate("/view-project-status")}>
                <FiEye className="nav-icon" />
                <span>Project Status</span>
              </li>
              <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
                <FiSettings className="nav-icon" />
                <span>Settings</span>
              </li>
              <li onClick={handleLogout} className="logout-item">
                <FiLogOut className="nav-icon" />
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="dashboard-header">
            <div className="header-left">
              <h1>Welcome back, {userData?.fullName?.split(' ')[0] || 'there'}!</h1>
              <p>Manage your home improvement projects with ease</p>
            </div>
            <div className="header-right">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search projects..." />
              </div>
              <div className="notification-bell">
                <FiBell />
                <span className="notification-badge">3</span>
              </div>
            </div>
          </header>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="overview-content">
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-icon">
                    <FiFileText />
                  </div>
                  <div className="stat-info">
                    <h3>3</h3>
                    <p>Active Projects</p>
                  </div>
                </div>
                
                <div className="stat-card success">
                  <div className="stat-icon">
                    <FiDollarSign />
                  </div>
                  <div className="stat-info">
                    <h3>$45,000</h3>
                    <p>Total Budget</p>
                  </div>
                </div>
                
                <div className="stat-card warning">
                  <div className="stat-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="stat-info">
                    <h3>65%</h3>
                    <p>Avg Progress</p>
                  </div>
                </div>
                
                <div className="stat-card info">
                  <div className="stat-icon">
                    <FiTool />
                  </div>
                  <div className="stat-info">
                    <h3>8</h3>
                    <p>Total Bids</p>
                  </div>
                </div>
              </div>

              {/* Projects Overview */}
              <div className="content-grid">
                <div className="card projects-card">
                  <div className="card-header">
                    <h3>Project Overview</h3>
                    <button className="btn-secondary" onClick={() => setActiveTab("projects")}>
                      View All
                    </button>
                  </div>
                  <div className="projects-list">
                    {projects.slice(0, 3).map(project => (
                      <div key={project.id} className="project-item">
                        <div className="project-info">
                          <h4>{project.title}</h4>
                          <p className="project-contractor">{project.contractor}</p>
                        </div>
                        <div className="project-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{project.progress}%</span>
                        </div>
                        <div className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                          {project.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card activity-card">
                  <div className="card-header">
                    <h3>Recent Activity</h3>
                  </div>
                  <div className="activity-list">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className={`activity-icon ${activity.type}`}>
                          {activity.type === 'bid' && <FiDollarSign />}
                          {activity.type === 'project' && <FiTool />}
                          {activity.type === 'payment' && <FiFileText />}
                        </div>
                        <div className="activity-content">
                          <p>{activity.text}</p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="projects-content">
              <div className="content-header">
                <h2>My Projects</h2>
                <button className="btn-primary" onClick={() => handleNavigate("/tender")}>
                  <FiPlus /> New Project
                </button>
              </div>
              
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-card-header">
                      <h3>{project.title}</h3>
                      <div className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </div>
                    </div>
                    
                    <div className="project-details">
                      <div className="detail-item">
                        <FiDollarSign className="detail-icon" />
                        <span>Budget: ${project.budget.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <FiTool className="detail-icon" />
                        <span>Contractor: {project.contractor}</span>
                      </div>
                    </div>
                    
                    <div className="project-progress-section">
                      <div className="progress-header">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="project-actions">
                      <button className="btn-outline">View Details</button>
                      <button className="btn-secondary">Messages</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="settings-content">
              <div className="content-header">
                <h2>Settings</h2>
              </div>
              
              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Profile Information</h3>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={userData?.fullName || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={userData?.email || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label>User Type</label>
                    <input type="text" value={userData?.userType || 'homeowner'} readOnly />
                  </div>
                  <button className="btn-primary">Update Profile</button>
                </div>
                
                <div className="settings-card">
                  <h3>Notifications</h3>
                  <div className="toggle-group">
                    <div className="toggle-item">
                      <span>Email Notifications</span>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="toggle-item">
                      <span>Project Updates</span>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="toggle-item">
                      <span>Bid Notifications</span>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeownerDashboard;