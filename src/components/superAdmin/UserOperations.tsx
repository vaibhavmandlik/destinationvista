import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserOperations = () => {
  // Sample data for the user list
  const userData = [
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
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Operations</h2>
        <button className="btn btn-primary">Email All Users</button>
      </div>

      <div className="row">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>2,420</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <h2>1,890</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Inactive Users</h5>
              <h2>530</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Average Session</h5>
              <h2>24m</h2>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="mt-5">
        <h4>User List</h4>
        <table className="table table-striped mt-3">
          <thead>
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
                  <span className={`badge bg-success`}>Active</span>
                </td>
                <td>{user.lastActive}</td>
                <td>
                  <a
                    href="#"
                    className="text-primary me-3"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </a>
                  <button className="btn btn-sm btn-danger">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-3">
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "50px" }}
                  ></i>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
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
