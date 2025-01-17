import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(false);
  const [isUserInteractionOpen, setIsUserInteractionOpen] = useState(false);

  const toggleSuperAdmin = () => {
    setIsSuperAdminOpen(!isSuperAdminOpen);
  };

  const toggleUserInteraction = () => {
    setIsUserInteractionOpen(!isUserInteractionOpen);
  };

  return (
    <nav
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <br />
      <br />
      <h5 className="mb-4 text-white">Destination Vista</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            <i className="bi bi-grid"></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#/package">
            <i className="bi bi-box"></i> Packages
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#/user">
            <i className="bi bi-person"></i> Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#/vendor">
            <i className="bi bi-person"></i> Vendor
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex justify-content-between align-items-center"
            href="#"
            onClick={toggleSuperAdmin}
          >
            <span>
              <i className="bi bi-shield-lock"></i> Super Admin
            </span>
            <i
              className={`bi ${isSuperAdminOpen ? "bi-chevron-up" : "bi-chevron-down"}`}
            ></i>
          </a>
          {isSuperAdminOpen && (
            <ul className="nav flex-column ml-3">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-chat-dots"></i> Chatbot
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-wallet"></i> Wallet
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-graph-up"></i> Daily Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-bar-chart-line"></i> Revenue Stats
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-envelope"></i> Email Updates
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-ticket"></i> Raise Ticket
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-check-circle"></i> Approved Requests
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-clock"></i> Pending Requests
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-send"></i> Send Bills
                </a>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex justify-content-between align-items-center"
            href="#"
            onClick={toggleUserInteraction}
          >
            <span>
              <i className="bi bi-people"></i> User Interaction
            </span>
            <i
              className={`bi ${isUserInteractionOpen ? "bi-chevron-up" : "bi-chevron-down"}`}
            ></i>
          </a>
          {isUserInteractionOpen && (
            <ul className="nav flex-column ml-3">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-geo-alt"></i> Trip Update
                </a>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            <i className="bi bi-gear"></i> Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
