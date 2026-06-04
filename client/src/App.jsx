import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import StorageDashboard from "./storageDashboard";
import Storage from "./storage";
import FacilityStats from "./FacilityStats";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <div className="bg-white border-bottom py-5 mb-5 shadow-sm">
                    <div className="container">
                      <h1 className="display-4 fw-bold text-dark">Management Dashboard</h1>
                      <p className="lead text-muted mb-0">Overview of all registered storage facilities.</p>
                    </div>
                  </div>
                  <StorageDashboard />
                </>
              } 
            />
            <Route path="/search" element={<Storage />} />
            <Route path="/stats" element={<FacilityStats />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="container text-center my-5 py-5">
                  <h1 className="display-1 fw-bold text-muted">404</h1>
                  <p className="lead">Oops! The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary mt-3">Back to Dashboard</a>
                </div>
              } 
            />
          </Routes>
        </main>

        <footer className="bg-white border-top py-4 mt-auto shadow-sm">
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
            <div className="small mb-2 mb-md-0">
              &copy; 2024 Storage Tracker Pro.
            </div>
            <div className="small">
              <span className="badge bg-light text-dark border me-2">SPA Routing Active</span>
              <span className="badge bg-info text-dark">React Router v7</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
