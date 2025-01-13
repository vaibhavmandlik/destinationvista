import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RaiseTickets = () => {
  const tickets = [
    {
      id: 1,
      title: "Payment Processing Issue",
      description: "Unable to process customer payment for Package #123",
      createdDate: "3/10/2024",
      status: "Pending",
    },
    {
      id: 2,
      title: "Booking System Error",
      description: "System showing incorrect availability for packages",
      createdDate: "3/9/2024",
      status: "Approved",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return <span className="badge bg-warning text-dark">Pending</span>;
    } else if (status === "Approved") {
      return <span className="badge bg-success">Approved</span>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Support Tickets</h5>
          <button className="btn btn-primary">New Ticket</button>
        </div>
        <div className="list-group">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="flex-grow-1">
                <h6 className="mb-1">
                  <i className="bi bi-file-text me-2"></i>
                  {ticket.title}
                </h6>
                <p className="mb-0 text-muted">{ticket.description}</p>
                <small className="text-muted">
                  Created: {ticket.createdDate}
                </small>
              </div>
              <div>{getStatusBadge(ticket.status)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaiseTickets;
