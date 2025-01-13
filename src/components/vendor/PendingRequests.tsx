import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PendingRequests = () => {
  const [requests] = useState([
    {
      id: 1,
      packageName: "City Explorer Package",
      customer: "Alice Johnson",
      date: "2024-03-25",
      people: 3,
      location: "Paris",
      price: "$2200",
    },
    {
      id: 2,
      packageName: "Desert Safari Adventure",
      customer: "Bob Wilson",
      date: "2024-03-30",
      people: 2,
      location: "Dubai",
      price: "$1500",
    },
  ]);

  const handleApprove = (id) => {
    alert(`Approved request with ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected request with ID: ${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Pending Requests</h5>
          <i className="bi bi-clock-history fs-4"></i>
        </div>
        <div className="list-group">
          {requests.map((request) => (
            <div
              key={request.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="flex-grow-1">
                <h6 className="mb-1">{request.packageName}</h6>
                <p className="mb-0 text-muted">Customer: {request.customer}</p>
                <div className="d-flex align-items-center mt-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  <span className="me-4">{request.date}</span>
                  <i className="bi bi-people me-2"></i>
                  <span className="me-4">{request.people} people</span>
                  <i className="bi bi-geo-alt me-2"></i>
                  <span>{request.location}</span>
                </div>
                <p className="mt-2 text-primary fw-bold">{request.price}</p>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={() => handleApprove(request.id)}
                >
                  <i className="bi bi-hand-thumbs-up"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleReject(request.id)}
                >
                  <i className="bi bi-hand-thumbs-down"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;
