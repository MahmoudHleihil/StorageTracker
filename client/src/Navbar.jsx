import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavCollapsed(true)}>
          <span className="fs-3 me-2">📦</span>
          <span className="fw-bold tracking-tight">StorageTracker Pro</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarNav" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold border-bottom border-primary border-3' : ''}`}
                onClick={() => setIsNavCollapsed(true)}
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/search" 
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold border-bottom border-primary border-3' : ''}`}
                onClick={() => setIsNavCollapsed(true)}
              >
                Inventory Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/stats" 
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold border-bottom border-primary border-3' : ''}`}
                onClick={() => setIsNavCollapsed(true)}
              >
                Facility Stats
              </NavLink>
            </li>
          </ul>
          
          <div className="ms-lg-4 d-flex align-items-center mt-3 mt-lg-0">
            <span className="badge bg-success rounded-pill px-3 py-2">
              <span className="spinner-grow spinner-grow-sm me-1" role="status"></span>
              System Online
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
