import React, { useState } from "react";
import { FaUsers, FaRunning, FaUserAltSlash, FaSyncAlt } from "react-icons/fa";


const UserOperations = () => {
  const [userData, setUserData] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      totalBookings: 12,
      lastActive: "3/10/2024",
      totalSpent: "$2,450",
      recentActivity: [
        "Booked Goa Beach Vacation Package - 2 days ago",
        "Booked Goa Beach Vacation Package - 2 days ago",
        "Booked Goa Beach Vacation Package - 2 days ago",
      ],
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      totalBookings: 8,
      lastActive: "2/15/2024",
      totalSpent: "$1,850",
      recentActivity: [
        "Booked Maldives Honeymoon Package - 3 days ago",
        "Booked Bali Retreat Package - 5 days ago",
      ],
      status: "Active",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeactivate = (index) => {
    setUserData((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, status: "Inactive" } : user
      )
    );
  };

  const handleEmailAllUsers = () => {
    alert("Emailing all users...");
  };

  const userCards = [
    { title: "Total Users", value: "2,420", change: "+12% from last month", icon: <FaUsers />, color: "#28a745", textColor: "text-success" },
    { title: "Active Users", value: "1,890", change: "-2% from last month", icon: <FaRunning />, color: "#28a745", textColor: "text-danger" },
    { title: "Inactive Users", value: "530", change: "+8% from last month", icon: <FaUserAltSlash />, color: "#dc3545", textColor: "text-success" },
    { title: "Recent Activity", value: "120", change: "+5% from last month", icon: <FaSyncAlt />, color: "#28a745", textColor: "text-warning" },
  ];

  return (
    <div className="container mt-4" style={{ backgroundColor: "#c1c6cf" }}>
      {/* Header with buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Operations</h2>
        <div>
          <button className="btn btn-success me-2">Add User</button>
          <button className="btn btn-primary" onClick={handleEmailAllUsers}>
            Email All Users
          </button>
        </div>
      </div>

      {/* User Statistics Cards */}
      <div className="row g-3">
        {userCards.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card text-start border-0 shadow-sm p-3" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{item.title}</h6>
                  <h4 className="fw-bold">{item.value}</h4>
                  <p className={`fw-bold ${item.textColor}`} style={{ fontSize: "14px" }}>{item.change}</p>
                </div>
                <div style={{ color: item.color, fontSize: "28px" }}>
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User List Table */}
      <div className="mt-5 p-3">
        <h4 className="text-secondary">User List</h4>
        <div className="table-container shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <table className="table table-striped mb-0">
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastActive}</td>
                  <td>
                    <button className="btn btn-link text-primary me-3" onClick={() => handleViewDetails(user)}>
                      View Details
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeactivate(index)}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal fade show custom-modal d-block" tabIndex="-1" onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-3">
                  <i className="bi bi-person-circle" style={{ fontSize: "50px" }}></i>
                  <h4>{selectedUser.name}</h4>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="row text-center mb-3">
                  <div className="col-md-4">
                    <h6>Total Bookings</h6>
                    <p>{selectedUser.totalBookings}</p>
                  </div>
                  <div className="col-md-4">
                    <h6>Last Active</h6>
                    <p>{selectedUser.lastActive}</p>
                  </div>
                  <div className="col-md-4">
                    <h6>Total Spent</h6>
                    <p>{selectedUser.totalSpent}</p>
                  </div>
                </div>
                <h6>Recent Activity</h6>
                <ul>
                  {selectedUser.recentActivity.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOperations;
