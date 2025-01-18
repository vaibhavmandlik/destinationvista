import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ApprovedRequests = () => {
  const approvedRequests = [
    {
      id: 1,
      packageName: "Beach Paradise Tour",
      customer: "John Doe",
      date: "2024-03-15",
      people: 4,
      location: "Maldives",
      price: "$2500",
    },
    {
      id: 2,
      packageName: "Mountain Adventure",
      customer: "Jane Smith",
      date: "2024-03-20",
      people: 2,
      location: "Swiss Alps",
      price: "$1800",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Approved Requests</h5>
          <i className="bi bi-check-circle text-success fs-4"></i>
        </div>
        <div className="list-group">
          {approvedRequests.map((request) => (
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
              </div>
              <div className="text-success fw-bold">{request.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovedRequests;
