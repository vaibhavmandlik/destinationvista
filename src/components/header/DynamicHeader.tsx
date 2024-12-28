import React, { useState } from "react";
import { Link } from "react-router-dom";

const DynamicHeader: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="container-fluid position-relative nav-bar p-0">
      <div
        className="container-lg position-relative p-0 px-lg-3"
        style={{ zIndex: 9 }}
      >
        <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
          <Link to="/" className="navbar-brand">
            <h1 className="m-0 text-primary">
              <span className="text-dark">DESTINATION</span>VISTA
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-between px-3 ${
              isCollapsed ? "" : "show"
            }`}
          >
            <div className="navbar-nav ml-auto py-0">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/packages" className="nav-item nav-link">
                Tour Packages
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-item nav-link">
                Contact
              </Link>
              <Link to="/destinations" className="nav-item nav-link">
                Destinations
              </Link>
              <Link to="/login" className="nav-item nav-link active">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DynamicHeader;
