import React from "react";
import { useAuth } from "./AuthContext"; // Add this import
import Navbar from "../components/Navbar/Navbar";
import "./ContractorDashboard.css";

const ContractorDashboard = () => {
  const { userData, logout } = useAuth();

  return (
    <div className="contractor-dashboard">
      <Navbar />

      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="avatar">{userData?.fullName?.charAt(0)}</div>
            <h3>{userData?.fullName}</h3>
            <p>Professional Contractor</p>
          </div>

          <nav className="dashboard-nav">
            <ul>
              <li className="active">
                <i className="icon-dashboard"></i>
                <span>Dashboard</span>
              </li>
              <li>
                <i className="icon-tenders"></i>
                <span>Available Tenders</span>
              </li>
              <li>
                <i className="icon-bids"></i>
                <span>My Bids</span>
              </li>
              <li>
                <i className="icon-materials"></i>
                <span>Material Listing</span>
              </li>
              <li>
                <i className="icon-estimator"></i>
                <span>Cost Estimator</span>
              </li>
              <li>
                <i className="icon-settings"></i>
                <span>Settings</span>
              </li>
              <li onClick={logout}>
                <i className="icon-logout"></i>
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <header className="dashboard-header">
            <h1>Contractor Dashboard</h1>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Active Bids</h3>
                <p>12</p>
              </div>
              <div className="stat-card">
                <h3>Won Projects</h3>
                <p>5</p>
              </div>
              <div className="stat-card">
                <h3>Pending Approvals</h3>
                <p>3</p>
              </div>
            </div>
          </header>

          <section className="recent-tenders">
            <h2>Recent Tenders</h2>
            <div className="tenders-grid">
              {/* Tender cards would go here */}
              <div className="tender-card">
                <h3>Residential House Construction</h3>
                <p>Budget: $50,000 - $70,000</p>
                <p>Location: Downtown</p>
                <div className="tender-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-bid">Place Bid</button>
                </div>
              </div>

              <div className="tender-card">
                <h3>Kitchen Renovation</h3>
                <p>Budget: $15,000 - $20,000</p>
                <p>Location: Suburbs</p>
                <div className="tender-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-bid">Place Bid</button>
                </div>
              </div>
            </div>
          </section>

          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn">
                <i className="icon-estimator"></i>
                <span>Create Estimate</span>
              </button>
              <button className="action-btn">
                <i className="icon-material"></i>
                <span>Add Materials</span>
              </button>
              <button className="action-btn">
                <i className="icon-profile"></i>
                <span>Update Profile</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ContractorDashboard;